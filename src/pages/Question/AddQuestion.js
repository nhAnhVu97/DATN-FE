import React, { Component } from 'react';
import { Row, Col } from 'antd';
import QuestionTypes from './../../components/Questions/QuestionTypes';
import { connect } from 'react-redux';
import { actShowQuestionTypeRequest } from './../../actions/index';
class AddQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idQuestionType: ""
        }
    }

    componentDidMount() {
        this.props.getQuestionType();
    }

    getIdTypeQuestion = (id) => {
        this.setState({ idQuestionType: id })
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.idQuestionType) {
            
        }
    }

    render() {
        // console.log("state", this.state.idQuestionType)
        let { questionType } = this.props;
        return (
            <div className="table" >
                <div className="table-title">
                    Bảng thể loại
                </div>
                <div className="box">
                    <div className="menu">
                        {/* {(notifycation.messages) ? <Alert closable message={notifycation.messages} type={notifycation.types} showIcon /> : ""} */}
                    </div>
                    <Row>
                        <Col lg={6}>
                            <div className="category-question">
                                <div className="title">
                                    Chọn loại câu hỏi
                                </div>
                                <div>
                                    <QuestionTypes getIdTypeQuestion={this.getIdTypeQuestion} questionType={questionType.items} />
                                </div>
                            </div>
                        </Col>
                        <Col lg={16}>
                            b
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        questionType: state.question
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getQuestionType: () => {
            dispatch(actShowQuestionTypeRequest())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);