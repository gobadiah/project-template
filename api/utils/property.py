"""Property.

model_property is used to declare a method as a class property like the
@property decorator, but store the model as well, it's needed by
drf-jsonapi when used in ResourceRelatedField.
"""


class ModelProperty(object):
    """This is a buffer class that store the model as well as the function."""

    def __init__(self, func, model):
        """Initialize ModelProperty, we store the function and the model."""
        self.func = func
        self.model = model

    def __get__(self, instance, cls):
        """Execute the stored function when an instance is provided."""
        if instance is None:
            return self
        else:
            return self.func(instance)


def model_property(model):
    """Decorate a function and return a wrapper storing the given model.

    It should be used like this:
    @model_property(Flower)
    def flowers(self):
        return self.flowers.all()

    That way this property can be used in ResourceRelatedField by drf-jsonapi.
    """
    def _wrapper(func):
        """Wrap func."""
        return ModelProperty(func, model)
    return _wrapper
