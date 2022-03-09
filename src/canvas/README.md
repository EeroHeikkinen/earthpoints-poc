# Points Badge End Point Usage

This document is about the parameters of /point-badge end point. This end point can generate multiple combination of point badge image in png format.

The end point url:

```
https://epoints.savesoil.cc/point-badge
```
## Parameters

With the following query string parameters there can be created many different styles of badges.

- **point**: a number that displays as point above the point text. This is the main number to be shown in the badge. If omitted 0 is displayed
- **total**: a number that displays as total below the total text. This is the secondary number to be shown in the badge. If omitted point theme is displayed
- **streak**: a number that displays on right hand side rotated 90 degrees along with the texts "streak" and "days" words. e.g. "STREAK 2 DAYS". This parameter is optional.
- **theme**: Excepts a set of string constants that changes the background theme of the badge. These are the possible values. This parameter is optional
    - Point Themes (more info below)
        - blue
        - green (default value)
    - Status Themes (more info below)
        - blue_bottom
        - bluered_bottom
        - greenred_bottom
        - green_bottom
        - bluegreen_top
        - blue_top
        - greenblue_top
        - green_top (default value)
- **confetti**: This parameter execpts numerical value from 1 to 6. Each decorates the badge with different confetti effects. In any badge a confetti is always shown. If it is invalid or omitted the default value is 1 for this parameter.


## Point Themes

First option shows only the given points. This one has no total or streak parameters. e.g. https://epoints.savesoil.cc/point-badge?point=50 So if you omit the total parameter this set of themes is being activated. This theme's intention is to show user his/her gained points at aparticular event.
- This option has two different themes. Green is the default one
    - blue https://epoints.savesoil.cc/point-badge?point=50&theme=blue
    - green https://epoints.savesoil.cc/point-badge?point=50&theme=green

## Status Themes

Second option is the status themes. Can be activated when a total parameter is given. Than the point parameter's value is shown under the "today" text and total parameter's value is shown below the "total" text. This theme's intention is to show user the current status of earned points today and earned points so far. Optionally a streak day can be shown in this theme.

## Some Examples

- https://epoints.savesoil.cc/point-badge?point=20&total=560&streak=100&theme=blue_bottom&confetti=2
- https://epoints.savesoil.cc/point-badge?point=10&total=560&streak=100&theme=bluegreen_top&confetti=4
- https://epoints.savesoil.cc/point-badge?point=5&total=560&streak=100&theme=greenred_bottom&confetti=4
- https://epoints.savesoil.cc/point-badge?point=5&total=560&streak=100&theme=greenred_bottom&confetti=4
- https://epoints.savesoil.cc/point-badge?point=20&total=560&streak=100&theme=bluered_bottom&confetti=2
- https://epoints.savesoil.cc/point-badge?point=100&total=560&streak=100&theme=green_top&confetti=6
- https://epoints.savesoil.cc/point-badge?point=50&theme=green&confetti=1
- https://epoints.savesoil.cc/point-badge?point=50&theme=blue&confetti=2