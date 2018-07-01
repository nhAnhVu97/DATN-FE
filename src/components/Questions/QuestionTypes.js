import React, { Component } from 'react';
import { Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class QuestionTypes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value,
        }, () => { this.props.getIdTypeQuestion(this.state.value) });

    }

    showOptions = (questionType) => {
        let result = null;
        result = questionType.map((question, index) => {
            return <RadioButton key={index} className="ckbQuestionType" value={question.id}>{question.name}</RadioButton>
        })
        return result;
    }

    render() {
        var { questionType } = this.props;
        return (
            <RadioGroup onChange={this.onChange} >
                {this.showOptions(questionType)}
            </RadioGroup>
        );
    }
}

export default QuestionTypes;