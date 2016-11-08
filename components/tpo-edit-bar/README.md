# tpo-edit-bar
>

## States

|            state            | save hidden | save disabled | delete hidden | delete disabled | yes hidden | no hidden |     message   | error |
|:----------------------------|:-----------:|:-------------:|:-------------:|:---------------:|:----------:|:---------:|:-------------:|:-----:|
| new                         |             |               | X             |                 | X          | X         |               |       |
| creating                    |             | X             | X             |                 | X          | X         | Creating...   |       |
| creating-error              |             |               | X             |                 | X          | X         | {error}       | X     |
| saved                       |             | X             |               |                 | X          | X         |               |       |
| changed                     |             |               |               |                 | X          | X         |               |       |
| saving                      |             | X             |               | X               | X          | X         | Saving...     |       |
| saving-error                |             |               |               |                 | X          | X         | {error}       | X     |
| changed-delete-confirmation | X           | X             | X             |                 |            |           | Are you sure? |       |
| changed-deleting            |             | X             |               | X               | X          | X         | deleting...   |       |
| changed-delete-error        |             |               |               |                 | X          | X         | {error}       | X     |
| saved-delete-confirmation   | X           | X             | X             |                 |            |           | Are you sure? |       |
| saved-deleting              |             | X             |               | X               | X          | X         | deleting...   |       |
| saved-delete-error          |             | X             |               |                 | X          | X         | {error}       | X     |

## Events
- `create` - Fired when moving to `saving` from `new`
- `update` - Fired when moving to `saving` from `changed`, `saving-error`, `changed-delete-error` or `saved-delete-error`
- `delete` - Fired when moving to `deleting` from `confirming`

## Functions
- `created()` - After responding to the `create` event, call this function on success
- `updated()` - After responding to the `update` event, call this function on success
- `deleted()` - After responding to the `delete` event, call this function on success
- `errored(message)` - After responding to an event, call this function on error
- `changed()` - After a change is detected in the form, call this function to enable save

## Imports
- `th-styles` - Global styles

## Properties
- `disabled(Boolean=false)` - If the bar should be disabled (if the form is invalid, for example)
- `hidden(Boolean=false)` - Whether the bar is hidden or not
- `message(String='')` - The currently displayed message (or error)
- `previousState(String='')` - The previous state
- `state(String='new')` - The current state

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
changed-deleting-->|errored called|changed-delete-error

changed-delete-error
changed-delete-error-->|delete clicked|changed-delete-confirmation
changed-delete-error-->|save clicked|saving

saved-delete-confirmation
saved-delete-confirmation-->|changed called|changed-delete-confirmation
saved-delete-confirmation-->|yes clicked|saved-deleting
saved-delete-confirmation-->|no clicked|saved

saved-deleting
saved-deleting-->|deleted called|new
saved-deleting-->|errored called|saved-delete-error

saved-delete-error
saved-delete-error-->|delete clicked|saved-delete-confirmation
saved-delete-error-->|changed called|changed-delete-error
````
