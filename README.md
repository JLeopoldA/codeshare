# **codeswap**

#### _codeswap_ is a tool that allows you to share and receive programming scripts. An account is not required or needed. _codeswap_ is a replacement wrapped for _node_. To use _codeswap_, replace the word _node_ on the command line when executing _codeswap_.


# ** Installation **

_codeswap_ can be installed by using **npm**.<br>
`npm install -g codeswap`<br>
This will install _codeswap_ globally for use in any directory in which you decide to share a file.<br>

# Usage
_codeswap_ wraps your application, so you can pass all of the arguments you would normally pass without using _node_.<br>
`codeswap [parameters]`<br>

For CLI options, use the -h (--help or help) argument:<br>
`codeswap -h`<br>
`codeswap --help`<br>
`codeswap help`<br>

Using _codeswap_ is simple with the following syntaxes.<br>
**NOTE**
_In order to share a file, the file must be located within the current working directory of your terminal, otherwise you must provide a path to the file. When a file is downloaded it is saved within the current working directory of your terminal._

# Sharing File with **_codeswap_**
To share a file, simply use the -s (--share or share) argument:<br>
`codeswap -s [fileName]` <br>
`codeswap --share [fileName]`<br>
`codeswap share [fileName]`<br>

After executing this script, a copy of your file is sent to the codeswap database and you are provided with a **KEY** and **ID**. In order for your file to be downloaded a **KEY** and **ID** must be provided.<br>

# Downloading File with **_codeswap_**
To download a file, simply use the -d (--download or download) argument:<br>
`codeswap -d [KEY] [ID]`<br>
`codeswap --download [KEY] [ID]`<br>
`codeswap download [KEY] [ID]`<br>

After executing this script, the desired file is retrieved from the codeswap database and immediately deleted from the database. The file will be saved under its original name within the current working directory of your terminal.

# **Updates**
I intend to continue updating _codeswap_ as a passion project for terminal based file sharing. Any suggestions for future updates or comments are welcomed at _cebafactory@gmail.com_. Thank you for using _codeswap_!





