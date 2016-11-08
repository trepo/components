# tpo-edit-bar
> Managing editing control and state

#### States
|            state            |   save   | delete   |   yes  |   no   |     message   |
|:----------------------------|:--------:|:--------:|:------:|:------:|:-------------:|
| new                         |          | hidden   | hidden | hidden |               |
| creating                    | disabled | hidden   | hidden | hidden | Creating...   |
| creating-error              |          | hidden   | hidden | hidden | {error}       |
| extant                       | disabled |          | hidden | hidden |               |
| changed                     |          |          | hidden | hidden |               |
| saving                      | disabled | disabled | hidden | hidden | Saving...     |
| saving-error                |          |          | hidden | hidden | {error}       |
| changed-delete-confirmation | hidden   | hidden   |        |        | Are you sure? |
| changed-deleting            | disabled | disabled | hidden | hidden | deleting...   |
| changed-deleting-error      |          |          | hidden | hidden | {error}       |
| extant-delete-confirmation   | hidden   | hidden   |        |        | Are you sure? |
| extant-deleting              | disabled | disabled | hidden | hidden | deleting...   |
| extant-deleting-error        | disabled |          | hidden | hidden | {error}       |

## Events
- `create` - Fired when moving from `new` or `creating-error` to `saving`.
- `update` - Fired when moving from `changed`, `saving-error`, `changed-deleting-error` or `extant-deleting-error` to `saving`.
- `delete` - Fired when moving from `changed-delete-confirmation` or `extant-delete-confirmation` to `changed-deleting` or `extant-deleting`.

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
creating-->|created called|extant
creating-->|errored called|creating-error

creating-error
creating-error-->|save clicked|creating

extant[extant*]
extant-->|changed called|changed
extant-->|delete clicked|extant-delete-confirmation

changed
changed-->|save clicked|saving
changed-->|delete clicked|changed-delete-confirmation

saving
saving-->|updated called|extant
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

extant-delete-confirmation
extant-delete-confirmation-->|changed called|changed-delete-confirmation
extant-delete-confirmation-->|yes clicked|extant-deleting
extant-delete-confirmation-->|no clicked|extant

extant-deleting
extant-deleting-->|deleted called|new
extant-deleting-->|errored called|extant-deleting-error

extant-deleting-error
extant-deleting-error-->|delete clicked|extant-delete-confirmation
extant-deleting-error-->|changed called|changed-deleting-error
````
