"""Tests for property."""

from ..property import ModelProperty, model_property


def test_model_property():
    """Test that model_property correctly wraps a function."""
    class A(object):
        pass

    class B(object):
        @model_property(A)
        def foo(self):
            """Return 5."""
            return 5

    assert type(B.foo) == ModelProperty
    assert B.foo.model == A
    b = B()
    assert b.foo == 5
