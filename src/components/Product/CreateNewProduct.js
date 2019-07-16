import React, { Component } from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
// import { withFirebase } from '../Firebase';

import './product.scss';

import { TextInput, TextArea, DropDown, CheckBoxChoice } from "../Common/FormElements";
// import ProfilePicture from "../Common/ProfilePic/profilePic";


import UploadPictures from '../Common/UploadPictures/uploadPictures';

const _CreateNewProductBtn = props => {
    const { authUser } = props;
    console.log(authUser);
    return (
        <React.Fragment>
            {
                authUser && authUser.profileType && authUser.profileType.toLowerCase() === "seller" ?
                    <CreateNewProductBtnBase {...props} />
                    :
                    null
            }
        </React.Fragment>
    )
}

class CreateNewProductBtnBase extends Component {
    render() {
        return (
            <button className="btn btn-primary btn-circle btn-xl add-product-btn" onClick={this.props.onClick}>
                <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
        );
    }
}

const CreateNewProduct = props => {
    const { authUser } = props;
    return (
        <React.Fragment>
            {
                authUser && authUser.profileType && authUser.profileType.toLowerCase() === "seller" ?
                    <CreateNewProductBase {...props} />
                    :
                    null
            }
        </React.Fragment>
    )
}

class CreateNewProductBase extends Component {
    state = {
        staticImages: [],
        productDetail: {
            main_title: "",
            quantity: "3",
            price: "0",
            scale: "",
            cul_type: "1",
            available_locations: [],
            description: "",
            profile_pic: "https://img.icons8.com/dusk/64/000000/user-male-skin-type-4.png"
        },
        cul_type_list: [{ id: "0", name: "organic" }, { id: "1", name: "trusted" }, { id: "2", name: "non-organic" }, { id: "3", name: "others" }],
        available_location_list: [{ id: "0", name: "Farm 1" }, { id: "1", name: "Farm 2" }, { id: "2", name: "Farm 3" }]
    };

    componentDidMount() {
    }

    componentWillReceiveProps() {
    }

    componentWillUpdate() {

    }

    handleSubmit = (evt) => {
        evt.preventDefault();
    }

    handleProfilePicChange = url => {
        let productDetail = { ...this.state.productDetail };
        productDetail.profile_pic = url;
        this.setState({ productDetail });
        console.log("Profile pic uploaded");
        console.log(url);
    }

    handleChange = ({ currentTarget: { name, value } }) => {
        let productDetail = { ...this.state.productDetail };
        productDetail[name] = value;
        this.setState({ productDetail });
    }
    handleCheckBoxChoice = available_location_list => {
        this.setState({ available_location_list });
    }
    handleCreateBtn = event => {
        this.props.onCreate();
    }
    handleCancelBtn = event => {
        this.props.onCancle();
    }
    handleUploadChange = (path, data) => {
        this.setState({ staticImages: data });
    }

    render() {
        const { main_title, quantity, price, scale, cul_type, available_locations, description } = this.state.productDetail;
        const cul_type_list = this.state.cul_type_list;
        const available_location_list = this.state.available_location_list;
        return (

            <form className="create-new-product" style={{ maxWidth: "768px", margin: "0 auto" }} onSubmit={this.handleSubmit}>
                <div className="col-12">
                    <UploadPictures data={this.state.staticImages} onChange={this.handleUploadChange}></UploadPictures>
                </div>
                <div className="col-12">
                    <TextInput name="main_title" label="Title" value={main_title} onChange={this.handleChange} />
                    <TextArea name="description" label="Description" value={description} onChange={this.handleChange} />
                    <div className="row">
                        <TextInput name="quantity" className="col-6" type="number" label="Quantity" value={quantity} onChange={this.handleChange} />
                        <TextInput name="price" className="col-6" type="number" label="Price ₹ - Per Qty" min="1" value={price} onChange={this.handleChange} />
                    </div>
                    <TextInput name="scale" type="text" label="Scale / Number - Per Qty" value={scale} placeholder="e.g.:KG" onChange={this.handleChange} />
                    <DropDown name="cul_type" label="Cultivated Type" value={cul_type} data={cul_type_list} onChange={this.handleChange} />
                    {/* <RadioOption name="cul_type" label="Cultivated Type" value={cul_type} data={cul_type_list} onChange={this.handleChange} /> */}
                    <CheckBoxChoice name="available_location" label="Available Locations" data={available_location_list} onClick={this.handleCheckBoxChoice} />
                    {/* <DropDown name="available_location" label="Available Locations" value={available_location} data={available_location_list} onChange={this.handleChange} /> */}
                    {/* <UploadPictures data={this.staticImages}></UploadPictures> */}
                </div>
                <div className="text-center">
                    <button type="button" className="btn btn-primary btn-circle btn-xl" onClick={this.handleCreateBtn}>
                        <i className="fa fa-check"></i>
                    </button>
                    <button type="button" className="btn btn-warning btn-circle btn-xl" onClick={this.handleCancelBtn}>
                        <i className="fa fa-times"></i>
                    </button>
                </div>
            </form>

        );
    }
}


// const condition = authUser => authUser && authUser.profileType && authUser.profileType.toLowerCase() === "seller";
const condition = authUser => !!authUser;

const CreateNewProductBtn = compose(withAuthorization(condition))(_CreateNewProductBtn);

export { CreateNewProductBtn };
export default compose(withEmailVerification, withAuthorization(condition))(CreateNewProduct);