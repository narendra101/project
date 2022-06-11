from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    username = models.CharField(max_length=80)
    email = models.EmailField()
    dob = models.DateField()


    def __str__(self) -> str:
        return self.username



