import React, { Component } from 'react';
import { Select, Spin } from 'antd';
import { connect } from 'react-redux';
import { actFetchCategoryRequest } from '../../actions';
const Option = Select.Option;

class CategorySelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initialValue: 0
        }
    }

    componentDidMount() {
        this.props.getCategory();
        console.log(this.props.initialValue)
    }

    showOptions(category) {
        var result = null;
        result = category.map((item, index) => {
            return <Option value={item.id} key={index}>{item.name}</Option>
        })
        return result;
    }



    render() {
        var { category, initialValue } = this.props
        return (
            <Spin spinning={category.isLoading} key={initialValue}>
                <Select autoFocus={true} defaultValue={initialValue} onChange={this.handleChange}>
                    {this.showOptions(category.items)}
                </Select>
            </Spin>
        );
    }
}

const mapStateToProps = state => {
    return {
        category: state.category
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategory: () => {
            dispatch(actFetchCategoryRequest())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelect);