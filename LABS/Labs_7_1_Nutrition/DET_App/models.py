from django.db import models
from django.contrib.auth.models import User

from uuid import uuid4

# Create your models here.


class User(models.Model):
    UserID = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    UserEmail = models.CharField(max_length=256, unique=True, blank=False)
    Username   = models.CharField(max_length=50, blank=False)
    UserFirstName = models.CharField(max_length=50, blank=True)
    UserLastName = models.CharField(max_length=50, blank=True)
    UserPW = models.CharField(max_length=256, blank=False)
    CustomerID = models.CharField(max_length=256, blank=True)
    Subscription = models.CharField(max_length=256, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'User'
        verbose_name_plural = 'user'


class Recipe(models.Model):
    RecipeID = models.UUIDField(
        primary_key=True, default=uuid4, editable=False)
    CookTime = models.CharField(max_length=50)
    CookingMethod = models.CharField(max_length=50)
    # Nutrition = models.CharField(max_length=100)
    RecipeTitle = models.CharField(max_length=50, blank=True)
    RecipeCategory = models.CharField(max_length=50)
    RecipeCuisine = models.CharField(max_length=50)
    # RecipeIngredients = models.ForeignKey(
    #     'Ingredients', on_delete=models.CASCADE)
    RecipeIngredients = models.CharField(max_length=100)
    RecipeInstructions = models.TextField()
    RecipeYield = models.IntegerField()
    SuitableForDiet = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Recipe'
        verbose_name_plural = 'recipes'

"""
Recipe TODO
TODO: For the Ingredient tab, it will need to render quantity, measurement and name
TODO: Quantity will need to be a user inputField that will multiply the nutrients rendered by the amount entered
TODO: Recipe may need more ingredientfields to parse information too...
"""

class Ingredients(models.Model):
    ndbno = models.IntegerField()
    name = models.CharField(max_length=255)
    measure = models.CharField(max_length=255)
    nutrients = models.CharField(max_length=255)
    nutrient_id = models.CharField(max_length=255)
    unit = models.CharField(max_length=255)
    gm = models.IntegerField()
    value = models.IntegerField()
    
    
    class Meta:
        db_table = 'Ingredients'
        verbose_name_plural = 'ingredients'



