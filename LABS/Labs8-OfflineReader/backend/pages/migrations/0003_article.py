# Generated by Django 2.1.3 on 2018-12-06 17:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pages', '0002_auto_20181206_1712'),
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=512)),
                ('author', models.CharField(default='', max_length=512)),
                ('normal_url', models.URLField(blank=True, default='', max_length=512, null=True)),
                ('resolved_url', models.URLField(blank=True, default='', max_length=512, null=True)),
                ('date_saved', models.DateTimeField(default=django.utils.timezone.now)),
                ('date_published', models.TextField(blank=True, default='', null=True)),
                ('excerpt', models.TextField(blank=True, default='', null=True)),
                ('cover_image', models.TextField(blank=True, default='', null=True)),
                ('video', models.TextField(blank=True, default='', null=True)),
                ('audio', models.TextField(blank=True, default='', null=True)),
                ('text', models.TextField(blank=True, null=True)),
                ('user_id', models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
