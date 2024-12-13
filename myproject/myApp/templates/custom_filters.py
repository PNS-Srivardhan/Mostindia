from django import template

register = template.Library()

@register.filter
def get_by_id(records, staff_id):
    """
    Retrieves the attendance type for a given staff ID from the records dictionary.
    """
    return records.get(staff_id)
