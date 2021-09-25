
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sms', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Appointment',
        ),
    ]
