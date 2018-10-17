import React from "react";
import { Text, View, Button, PanResponder } from "react-native";
import { Constants } from "expo";

import styles from "./style";

export default class DragExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blockCount: 30
    };
    this.blocks = [];
    this.selection = {
      start: null,
      end: null
    };
  }

  componentWillMount() {
    this.fillBlocks();
    this.runPanResponder();
  }

  render() {
    return (
      <View>
        <View style={styles.blockContainer} {...this._panResponder.panHandlers}>
          {this.renderBlocks()}
        </View>
        <Button title="Deselect" onPress={this.clearSelection.bind(this)} />
      </View>
    );
  }

  /* ------------------------------------------------------------- */
  /*                      BLOCKS RENDER                            */
  /* ------------------------------------------------------------- */
  renderBlocks() {
    return this.blocks.map((block, index) => {
      const style = [styles.block];

      if (this.isSelected(index)) {
        style.push(styles.selected);
      }
      return (
        <View
          style={style}
          key={`_block_${block.id}`}
          ref={block.id}
          onLayout={ev => this.setBlockPosition(ev, block, index)}
        >
          <Text>{block.name}</Text>
        </View>
      );
    });
  }
  isSelected(index) {
    // Check if block is highlighted
    if (this.selection.start !== null) {
      const isReverse = this.selection.end < this.selection.start;
      const _start = isReverse ? this.selection.end : this.selection.start;
      const _end = isReverse ? this.selection.start : this.selection.end;
      return index >= _start && index <= _end;
    }
  }

  setBlockPosition(ev, block, index) {
    // Save block size and position (Recommend having different object for these values);
    if (this.refs && this.refs[block.id]) {
      this.refs[block.id].measure((x, y, width, height, pageX, pageY) => {
        this.blocks[index]["position"] = {
          x: pageX,
          y: pageY,
          width: width,
          height: height
        };
      });
    }
  }

  fillBlocks() {
    // Fill blocks
    for (let i = 0; i < this.state.blockCount; i++) {
      this.blocks.push({ id: i, name: i + 1 });
    }
  }

  clearSelection() {
    this.selection.start = null;
    this.selection.end = null;
    this.setState({ selection: this.selection });
  }

  /* ------------------------------------------------------------- */
  /*                      PAN RESPONDER                            */
  /* ------------------------------------------------------------- */

  runPanResponder() {
    // Run pan responder;
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.panResponderStart(evt, gestureState);
      },
      onPanResponderMove: (evt, gestureState) => {
        this.handlePanResponderDrag(evt, gestureState);
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.handlePanResponderEnd(evt, gestureState);
      }
    });
  }
  // _ touch start - see if touch is available
  panResponderStart(evt, gestureState) {
    this.findBlockMatch(gestureState.x0, gestureState.y0).then(index => {
      this.selection.start = index;
      this.selection.end = index;
      this.setState({ selection: this.selection });
    });
  }
  // _ touch draging - update current selection
  handlePanResponderDrag(evt, gestureState) {
    this.findBlockMatch(gestureState.moveX, gestureState.moveY).then(index => {
      this.selection.end = index;
      this.setState({ selection: this.selection });
    });
  }
  // _ touch end - handle highlight
  handlePanResponderEnd(evt, gestureState) {}

  // _ check which block is draged over
  findBlockMatch(x, y) {
    return new Promise(resolve => {
      this.blocks.forEach((block, index) => {
        const pos = block.position;
        if (x >= pos.x && x <= pos.x + pos.width) {
          if (y >= pos.y && y <= pos.y + pos.height) {
            resolve(index);
          }
        }
      });
    });
  }
}
