1: The first room

```
#####
#####
#####
```

2. Select a random wall

```
#####
#####W
#####
```

3. Scan area for new corridor (including space on all sides)

```
#####**********
#####W*********
#####**********
```

4. It's clear, so add new feature

```
#####
#####D########
#####
```

5. Pick another wall:

```
#####     W
#####D########
#####
```

6. Scan area for new Room

```
       ******
       ******
       ******
       ******
       ******
#####  ***W**
#####D########
#####
```

7. Area is OK, so add new room. Throw in a chest (C) for good measure

```
        ####
        ###C
        ####
        ####
#####     D  
#####D########
#####
```

8. Add another corridor as before

```
             #
             #
        #### #
        ###C #
        #### #
        #### #
#####     D  #
#####D########
#####
```

9. This time, we try to add corridor to the second room.

```
             #
             #
        #### #
        ###C*******
        ####W******
        ####*******
#####     D  #
#####D########
#####
```

10. This fails since the area being scanned is already used.

```
             #
             #
        #### #
        ###C #
        #### #
        #### #
#####     D  #
#####D########
#####
```

11. Fancy features. Add an octagonal room

```
             #
             #   ###
        #### #  #####
        ###C # #######
        #### #D#######
        #### # #######
#####     D  #  #####
#####D########   ###
#####
```

12. A secret door hides a fiendishly trapped corridor:

```
             #
             #   ###
        #### #  #####
        ###C # #######S###T##TT#T##
        #### #D#######
        #### # #######
#####     D  #  #####
#####D########   ###
#####
```

13. Hey, I could go on and on...
