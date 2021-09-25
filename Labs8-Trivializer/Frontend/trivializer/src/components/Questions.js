import React, { Component } from "react";
import "./styles/Questions.css";
import { DragSource, DropTarget } from "react-dnd";
import { findDOMNode } from "react-dom";
import flow from "lodash/flow"; // Necessary for react DnD to attach more than one function ("Role") to this component, i.e. any question is both a DragSource AND a DropTarget

const createDOMPurify = require("dompurify"); // Prevents XSS attacks from incoming HTML

// Sanitizes incoming HTML from questions API and allows for HTML entities while protecting against XSS attacks
const DOMPurify = createDOMPurify(window);

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question.question,
      answers: this.props.question.answers,
      userSheet: this.props.userSheets
    };
  }

  componentDidMount = () => {};

  render() {
    const { question, isDragging, connectDragSource, connectDropTarget, index } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      connectDropTarget(
        <div className="question" style={{ opacity: opacity }}>
          <div className="questions-col1">
            <div style={{ opacity: opacity }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${index + 1}) ` + DOMPurify.sanitize(question.question) // See line 5 for DOMPurify description
                }}
              />
              <div>
                <ul className="questions">
                  {question.answers.map((answer, index) => {
                    return (
                      <li
                        key={index}
                        style={
                          answer === question.correct_answer && !this.state.userSheet
                            ? { fontWeight: "bold" }
                            : { fontWeight: "normal" }
                        }
                        className="answer"
                        dangerouslySetInnerHTML={{
                          // 0x41 is ASCII for 'A'
                          __html:
                            `${String.fromCharCode(0x41 + index)}) ` + DOMPurify.sanitize(answer) // Purify incoming HTML while still displaying HTML entities
                        }}
                      />
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="questions-col2">
            <button
              onClick={this.props.replaceQuestion}
              type="button"
              className="btn btn-primary round replace-question"
            >
              Replace Question
            </button>
            <button
              onClick={this.props.undoReplace}
              type="button"
              className="btn btn-primary round undo-replace"
            >
              Undo Replace
            </button>
          </div>
        </div>
      )
    );
  }
}

// These functions below work with React DnD to determine the behavior of the dropped questions

const questionSource = {
  beginDrag(props) {
    return {
      question: props.question,
      index: props.index,
      listId: props.listId
    };
  }
};

const questionTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.moveQuestion(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  }
};

export default flow(
  DropTarget("QUESTION", questionTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource("QUESTION", questionSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(Questions);
