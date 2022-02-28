# Generated by Django 2.1.3 on 2018-12-05 16:07

import JobMatcherApp.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0005_update_job_salary'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='description',
            field=models.CharField(blank=True, max_length=10000),
        ),
        migrations.AlterField(
            model_name='job',
            name='extra_skills',
            field=JobMatcherApp.models.SkillsField(base_field=models.CharField(max_length=30), blank=True, default=list, size=20),
        ),
        migrations.AlterField(
            model_name='job',
            name='familiar_with',
            field=JobMatcherApp.models.SkillsField(base_field=models.CharField(max_length=30), blank=True, default=list, size=20),
        ),
        migrations.AlterField(
            model_name='job',
            name='requirements',
            field=models.CharField(blank=True, max_length=10000),
        ),
        migrations.AlterField(
            model_name='job',
            name='top_skills',
            field=JobMatcherApp.models.SkillsField(base_field=models.CharField(max_length=30), blank=True, default=list, size=20),
        ),
    ]