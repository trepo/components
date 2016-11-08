# tpo-edit-bar
> Managing editing control and state

#### States
|            state            |   save   | delete   |   yes  |   no   |     message   |
|:----------------------------|:--------:|:--------:|:------:|:------:|:-------------:|
| new                         |          | hidden   | hidden | hidden |               |
| creating                    | disabled | hidden   | hidden | hidden | Creating...   |
| creating-error              |          | hidden   | hidden | hidden | {error}       |
| saved                       | disabled |          | hidden | hidden |               |
| changed                     |          |          | hidden | hidden |               |
| saving                      | disabled | disabled | hidden | hidden | Saving...     |
| saving-error                |          |          | hidden | hidden | {error}       |
| changed-delete-confirmation | hidden   | hidden   |        |        | Are you sure? |
| changed-deleting            | disabled | disabled | hidden | hidden | deleting...   |
| changed-deleting-error      |          |          | hidden | hidden | {error}       |
| saved-delete-confirmation   | hidden   | hidden   |        |        | Are you sure? |
| saved-deleting              | disabled | disabled | hidden | hidden | deleting...   |
| saved-deleting-error        | disabled |          | hidden | hidden | {error}       |

## Events
- `create` - Fired when moving from `new` or `creating-error` to `saving`.
- `update` - Fired when moving from `changed`, `saving-error`, `changed-deleting-error` or `saved-deleting-error` to `saving`.
- `delete` - Fired when moving from `changed-delete-confirmation` or `saved-delete-confirmation` to `changed-deleting` or `saved-deleting`.

## Functions
- `created()` - After responding to the `create` event, call this function on success.
- `updated()` - After responding to the `update` event, call this function on success.
- `deleted()` - After responding to the `delete` event, call this function on success.
- `errored(message)` - After responding to an event, call this function on error.
- `changed()` - After a change is detected in the form, call this function to enable save.

## Properties
- `state` - The current state.

### Mermaid graph
````text
graph TB
new[new*]
new-->|save clicked|creating

creating
creating-->|created called|saved
creating-->|errored called|creating-error

creating-error
creating-error-->|save clicked|creating

saved[saved*]
saved-->|changed called|changed
saved-->|delete clicked|saved-delete-confirmation

changed
changed-->|save clicked|saving
changed-->|delete clicked|changed-delete-confirmation

saving
saving-->|updated called|saved
saving-->|errored called|saving-error

saving-error
saving-error-->|save clicked|saving
saving-error-->|delete clicked|changed-delete-confirmation

changed-delete-confirmation
changed-delete-confirmation-->|no clicked|changed
changed-delete-confirmation-->|yes clicked|changed-deleting

changed-deleting
changed-deleting-->|deleted called|new
changed-deleting-->|errored called|changed-deleting-error

changed-deleting-error
changed-deleting-error-->|delete clicked|changed-delete-confirmation
changed-deleting-error-->|save clicked|saving

saved-delete-confirmation
saved-delete-confirmation-->|changed called|changed-delete-confirmation
saved-delete-confirmation-->|yes clicked|saved-deleting
saved-delete-confirmation-->|no clicked|saved

saved-deleting
saved-deleting-->|deleted called|new
saved-deleting-->|errored called|saved-deleting-error

saved-deleting-error
saved-deleting-error-->|delete clicked|saved-delete-confirmation
saved-deleting-error-->|changed called|changed-deleting-error
````
