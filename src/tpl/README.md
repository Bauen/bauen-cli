# Templates
This folder contains a number of template files that are just ideas around how blocks should be turned into environments. There is a section corresponding with each file that describes the purpose of the file.

## resources.json
This file contains a set of blocks that this current block depends upon. Each block dependency should contain the following information:
* Name (key).
* Source repository.
* Networking rules for private and public IPs.

## .instances.json
This (dot) file contains a generated map of resources. Bauen will look for this file when attempting to call dependant blocks. Instances should contain the following metadata:
* Name (key).
* Type (protocol).
* Private IP (if applicable).
* Public IP (if applicable).

## .env.json
This (dot) file should contain the environment variables needed for the current block, and all it's dependant(_n_) blocks. This file should contain the following metadata:
* `self` property which is a map of environment variable names and values for the current block (For cornerstone blocks only).
* Name (key).
* Environment variable name (second-level key).
* Environment variable value (value of second key).


