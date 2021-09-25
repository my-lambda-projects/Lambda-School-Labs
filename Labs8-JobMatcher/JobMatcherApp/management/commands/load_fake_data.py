import random

from django.contrib.auth.hashers import make_password
from django.core.management.base import BaseCommand
from django.db import transaction
from faker import Faker
from oauth2_provider.models import Application

from JobMatcherApp.models import Employer, Seeker, User
from billing.models import Transaction
from jobs.models import Job, Match

fake = Faker()

SKILLS = ['Leadership', 'Vision', 'Execution', 'React', 'Vue', 'JS', 'Django', 'DRF', 'GraphQL', 'Node', 'AWS',
          'Python', 'TensorFlow', 'Watson', 'SciKit', 'CSS', 'ES6', 'Vue', 'Agile', 'Scrum', 'Git', 'Auth0', 'OAuth2',
          'Python', 'C++', 'CI/CD']

TITLES = ['VP Of Engineering',
          'Snr Frontend Engineer',
          'Snr Backend Engineer',
          'Senior Tech Lead',
          'Frontend Developer',
          'Backend Developer',
          'Full Stack Developer',
          'Data Scientist',
          'The ML/AI Engineer',
          'Full Stack Engineer',
          'UI/UX Designer',
          'iOS Developer',
          'Android Developer']
TAGS = ['BS', 'in', 'Math', 'and', 'CS', 'from', 'Santa', 'Clara', 'University', 'Worked', 'in', 'Silicon', 'Graphics',
        '1985', 'Joined', 'Netscape', 'in', '1990', 'and', 'created', 'JS', 'in', '10', 'days.', 'In', '1998',
        'Co-founder', 'Mozilla.', 'Brave', 'Browser']

YEARS = [str(i) for i in range(2000, 2018)]

WORDS = SKILLS + TITLES + TAGS + YEARS


class Command(BaseCommand):
    help = "Fill database with Seekers, Employer, Jobs"

    def flush(self):
        Application.objects.all().delete()
        Match.objects.all().delete()
        Transaction.objects.all().delete()
        Job.objects.all().delete()
        Seeker.objects.all().delete()
        Employer.objects.all().delete()
        User.objects.all().delete()

    @transaction.atomic
    def handle(self, *args, **options):
        self.flush()
        User.objects.create_superuser('admin@admin.com', 'password')

        Application.objects.create(client_id='test', client_secret='test', name='Test OAuthApp',
                                   client_type=Application.CLIENT_PUBLIC,
                                   authorization_grant_type=Application.GRANT_PASSWORD)
        num_jobs = 50
        num_seekers = 100
        num_employers = 11
        num_sentences = 25
        password = make_password('5555555555')
        company_name_static = ['Apple', 'Facebook', 'Netflix', 'Snapchat', 'Starbucks', 'Adobe', 'Slack',
                               'Lyft', 'Instagram', 'Stripe', 'Pinterest']
        company_summary_static = ['More than just a fruit, we charge 1000 for a phone',
                                  'Data is so safe, that even your Grandma is on here',
                                  'Come on, come all, everybody gets a special',
                                  'Now you see it, now you dont',
                                  'Overpricing coffee since 1971',
                                  "Finally don't have to update Reader anymore",
                                  "We're all grown up and about to IPO",
                                  "Sure have another, you're not driving",
                                  "Maybe she's born with it, maybe it's a 100 filters",
                                  "We making taking payments so easy, a monkey could do it",
                                  "Every interesting picture ever... lots of cats"]

        seeker_summary = "A senior professional committed to excellence in engineering. Looking to join a successful " \
                         "company with growth opportunities."

        users = User.objects.bulk_create([
            User(email=f'{i}@seeker.com', password=password, first_name=fake.first_name_male(),
                 last_name=fake.last_name_male(), is_seeker=True)
            if i % 2 == 0 else
            User(email=f'{i}@seeker.com', password=password, first_name=fake.first_name_female(),
                 last_name=fake.last_name_female(), is_seeker=True)
            for i in range(num_seekers)
        ])
        seekers = Seeker.objects.bulk_create([
            Seeker(
                user=users[i],
                # summary=fake.catch_phrase(),
                summary=seeker_summary,
                photo=f'https://randomuser.me/api/portraits/men/{random.randrange(0, 99)}.jpg'
                if i % 2 == 0 else f'https://randomuser.me/api/portraits/women/{random.randrange(0, 99)}.jpg',
                credits=random.randrange(0, 100),
                free_apps=random.randrange(0, 10),
                desired_title=f'{random.choice(TITLES)}',
                top_skills=random.choices(SKILLS, k=3),
                extra_skills=random.choices(SKILLS, k=3),
                other_skills=random.choices(SKILLS, k=3),
                experience=fake.paragraph(nb_sentences=num_sentences, variable_nb_sentences=True, ext_word_list=WORDS),
                education=fake.paragraph(nb_sentences=num_sentences, variable_nb_sentences=True, ext_word_list=WORDS),
            ) for i in range(num_seekers)
        ])
        self.stdout.write(self.style.SUCCESS(f'Successfully added {num_seekers} seekers'))

        # employers
        users = User.objects.bulk_create([
            User(email=f'{i}@employer.com', password=password, first_name=fake.first_name_male(),
                 last_name=fake.last_name_male(), is_employer=True)
            if i % 2 == 0 else
            User(email=f'{i}@employer.com', password=password, first_name=fake.first_name_female(),
                 last_name=fake.last_name_female(), is_employer=True)
            for i in range(num_employers)
        ])
        employers = Employer.objects.bulk_create([
            Employer(
                user=users[i],
                # summary=fake.catch_phrase(),
                summary=company_summary_static[i],
                credits=random.randrange(0, 1000),
                free_calls=random.randrange(0, 1000),
                postings=random.randrange(0, 100),
                # photo=f'https://randomuser.me/api/portraits/men/{random.randrange(0, 99)}.jpg'
                # if i % 2 == 0 else f'https://randomuser.me/api/portraits/women/{random.randrange(0, 99)}.jpg',
                # company_name=f'#{i + 1} - {fake.company()}',
                photo=f'https://logo.clearbit.com/{company_name_static[i]}.com',
                company_name=company_name_static[i]
            ) for i in range(num_employers)
        ])
        self.stdout.write(self.style.SUCCESS(f'Successfully added {num_employers} employers'))

        # jobs
        jobs = Job.objects.bulk_create([
            Job(
                employer=random.choice(employers),
                # title=f'#{i + 1} - {random.choice(TITLES)}',
                title=f'{random.choice(TITLES)}',
                salary_min=random.randrange(80, 120),
                salary_max=random.randrange(121, 250),
                top_skills=random.choices(SKILLS, k=3),
                extra_skills=random.choices(SKILLS, k=3),
                familiar_with=random.choices(SKILLS, k=3),
                description=fake.paragraph(nb_sentences=num_sentences, variable_nb_sentences=True, ext_word_list=WORDS),
                requirements=fake.paragraph(nb_sentences=num_sentences, variable_nb_sentences=True,
                                            ext_word_list=WORDS),
                is_active=True,
            ) for i in range(num_jobs)
        ])
        self.stdout.write(self.style.SUCCESS(f'Successfully added {num_jobs} jobs'))

        # Matches

        for job in jobs:
            # Select 20% of the seekers
            job_seekers = set(random.choices(seekers, k=int(num_seekers * 20 / 100)))

            # Create Matches from seeker side on the job from outer loop
            matches = Match.objects.bulk_create([
                Match(employer=job.employer, seeker=seeker, job=job,
                      seeker_action=random.choice([Match.APPLY, Match.SUPER, Match.SKIP]))
                for seeker in job_seekers
            ])

            # Update the matches from the employer side
            for match in matches:
                match.employer_action = random.choice([Match.CALL, Match.SUPER, Match.SKIP])
                match.save()
            self.stdout.write(self.style.SUCCESS(f'Successfully added {len(job_seekers)} matches for {job}'))
