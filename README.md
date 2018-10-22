# ReactNative drag select


I was making calendar for some other application, and it required ability to drag select dates for events. At the time I was not able to find any other solution already given by ReactNative, so I had to make my own.

My approach was 'basic', it is the way the most of 2D games work, you track position of entities, and on every frame we check for colision (or on action). 

This demo actions - 
- log all positions (x, y, width, height) of "dates" on render and store them to array.
- Run PanResponder on container ('calendar') and listen for its actions.
- On drag actions - run match check
- Match check - Loop through saved positions and check if they match with current touch position.
    - If match update 'selection' state.

### Notice
> This is not using best ReactNative practices.

### Installation

Install the dependencies and run the demo.

```sh
$ cd ReactNativeDragSelect
$ npm install 
$ expo start
Choose to start emulator/simulator
```

### Demo preview

[![N|Solid](https://github.com/TeslaAdis/ReactNativeDragSelect/blob/master/assets/full_preview.gif?raw=true)](https://github.com/TeslaAdis/ReactNativeDragSelect/blob/master/assets/full_preview.gif?raw=true)

