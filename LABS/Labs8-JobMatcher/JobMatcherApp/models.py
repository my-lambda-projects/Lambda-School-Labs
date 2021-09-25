import uuid

from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, BaseUserManager, AbstractUser
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.utils.http import int_to_base36
from django.utils.translation import gettext_lazy as _

ID_LENGTH = 10


def id_gen() -> str:
    """Generates random string whose length is `ID_LENGTH`."""
    return int_to_base36(uuid.uuid4().int)[:ID_LENGTH]


class BaseModel(models.Model):
    """
    Django abstract model whose primary key is a random string and has auto create and update datetime fields.

    This acts as the base model for all other models.
    """
    id = models.CharField(max_length=ID_LENGTH, primary_key=True, default=id_gen, editable=False)
    created_at = models.DateTimeField(verbose_name=_('created time'), auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(verbose_name=_('updated time'), auto_now=True, db_index=True)

    class Meta:
        abstract = True


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a user with the given email, and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser, BaseModel):
    username = None
    email = models.EmailField(_('email address'), max_length=255, unique=True)  # Singular Field Uniqueness
    is_seeker = models.BooleanField(_('seeker'), default=False)
    is_employer = models.BooleanField(_('employer'), default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return f'{self.id}: {self.email} {self.first_name} {self.last_name}'


class Profile(BaseModel):
    user = models.OneToOneField(verbose_name=_('user'), to='User', related_name='%(class)s', on_delete=models.CASCADE)
    photo = models.URLField(max_length=500, blank=True)
    summary = models.CharField(_('summary'), max_length=500, blank=True)
    confirm_spending = models.BooleanField(default=False)
    # User balance
    credits = models.IntegerField(default=0)

    class Meta:
        abstract = True

    # Magic Method for a nicer representation for the profile
    def __str__(self):
        return f'{self.id}: {self.__class__.__name__}: {self.user.email}'


class SkillsField(ArrayField):
    """ArrayField subclass to be used for saving skills under Seeker. Requires Postgres database."""

    def __init__(self, *args, **kwargs):
        kwargs.setdefault('base_field', models.CharField(max_length=30, blank=False))
        kwargs.setdefault('blank', True)
        kwargs.setdefault('default', list)
        super().__init__(*args, **kwargs)


class Seeker(Profile):
    desired_title = models.CharField(_('desired title'), max_length=150, blank=True)
    top_skills = SkillsField(size=5)
    extra_skills = SkillsField()
    other_skills = SkillsField()
    experience = models.CharField(max_length=10000, blank=True)
    education = models.CharField(max_length=10000, blank=True)
    # Start with 5 free apps (applications) [done]
    # Get plus 1 free app per day [pending]
    # Max 10 free Apps stored [pending]
    # free_apps = models.IntegerRangeField(default=5, min_value=0, max_value=10)
    free_apps = models.IntegerField(default=5)


class Employer(Profile):
    company_name = models.CharField(_('company name'), max_length=100, blank=True)
    # Get one free call per day(employer version of app / match) [pending]
    free_calls = models.IntegerField(default=0)
    postings = models.IntegerField(default=1)
