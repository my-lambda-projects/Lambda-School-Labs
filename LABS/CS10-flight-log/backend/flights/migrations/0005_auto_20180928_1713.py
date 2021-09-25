# Generated by Django 2.1.1 on 2018-09-28 17:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flights', '0004_instructor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='instructor',
            name='contact_email',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='instructor',
            name='contact_number',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AlterField(
            model_name='instructor',
            name='description',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='instructor',
            name='license_number',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='instructor',
            name='photo',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='instructor',
            name='ratings',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
