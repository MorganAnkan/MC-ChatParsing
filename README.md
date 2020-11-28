# MC-ChatParsing
A recursive algorithm to decode minecraft chat json to section symbols. Also does translations.

# Info
The included file is an example, you only need the parseChat function and the getColor function. If you want to do translations, make sure to have the mappings. You can get them at https://github.com/prismarinejs/minecraft-data.



Happy botting!

(Also if you use this in your bot or just like it maybe consider giving it a star? :D)

# Notes
1.16 chat hex colors do not show up at all in processed text

You can get an updated translations.json from decompiling the minecraft version jar and grabbing assets/minecraft/lang/en_us.json

### or:

Look in the folder C:\Users{yourname}\AppData\Roaming.minecraft\assets\indexes for the index file of the version you are interested in. e.g. 1.13.2.json

This .json file is just structured text. Search it for the language tag e.g. it_it

You find a magic string, called a hash, looks like 0ba676fd65652b4c166eeb9148a50413b8eca0de. This is the index to the language file. Note the first two characters 0b

Look in the folder C:\Users{yourname}\AppData\Roaming.minecraft\assets\objects\0b

Open the file in this folder with the filename 0ba676fd65652b4c166eeb9148a50413b8eca0de - again, this is actually a simple text file, another .json structure, with all the language mappings for this language.
