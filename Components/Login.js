import React, { Component } from 'react';
import {View, 
	Text, 
	StyleSheet,
	KeyboardAvoidingView,
	TouchableOpacity,
	Image} 
from 'react-native';
import Start from './Start';
import {Actions} from 'react-native-router-flux';
var path;
export default class Login extends Component{
constructor(props) {
	super(props)
	this.state = {Provinsi:'',
				  Kota: '',
				  NIK: '',
				  Nama: '',
				  Tempat_Tgl_Lahir: '',
				  Jenis_Kelamin: '',
				  Golongan_Darah:'',
					Alamat:'',
					RT_RW: '',
					Kel_Desa: '',
					Kecamatan: '',
					Agama: '',
					Status_Perkawinan:'',
					Pekerjaan: '',
					Kewarganegaraan: '',
					valid: '',
					Berlaku_Hingga:''}
}
		Start(){
			Actions.Start();
		}

	render(){
		var ImagePicker = require('react-native-image-picker');

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info below in README)
 */
ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);
  path = response.path
  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
		 console.log('User selected a file form camera or gallery', response); 
		 const data = new FormData();
		 data.append('name', 'avatar');
		 data.append('fileData', {
		  uri : response.uri,
		  type: response.type,
		  name: response.fileName
		 });
		 const config = {
		  method: 'POST',
		  headers: {
		   'Accept': 'application/json',
		   'Content-Type': 'multipart/form-data',
		   'name': 'KTP'
		  },
		  body: data,
		 };
		fetch("http://206.189.159.245:3000/" + "upload", config)
		 .then((checkStatusAndGetJSONResponse)=>{    
		   return checkStatusAndGetJSONResponse.json()
		}).then((json) => {
			console.log(json)
			if( json.data <= 200 || json.data >= 400 )
				this.setState({valid:'IMAGE INVALID, PLEASE CHECK YOUR IMAGE QUALITY AND MAKE SURE IT IS A KTP'})
			else{
		  this.setState({Provinsi:json.Provinsi,
		  				Kota:json.Kota,
		  				NIK:json.NIK,
		  				Nama:json.Nama,
		  				Tempat_Tgl_Lahir:json.Tempat_Tgl_Lahir,
		  				Jenis_Kelamin:json.Jenis_Kelamin,
		  				Golongan_Darah:json.Golongan_Darah,
		  				Alamat:json.Alamat,
		  				RT_RW:json.RT_RW,
		  				Kel_Desa:json.Kel_Desa,
		  				Kecamatan:json.Kecamatan,
		  				Agama:json.Agama,
		  				Status_Perkawinan:json.Status_Perkawinan,
		  				Pekerjaan:json.Pekerjaan,
		  				Kewarganegaraan:json.Kewarganegaraan,
		  				Berlaku_Hingga:json.Berlaku_Hingga })
			}
		 }).catch((err)=>{console.log(err)});

		}
});




		return(
			<KeyboardAvoidingView behaviour="padding" style={styles.background}>
			<View style = {styles.background}> 
				<View style = {styles.logoContainer}>
					 <Text style= {styles.title}>This is your text :</Text>
					 <Text style = {styles.titleex}>Provinsi: {this.state.Provinsi}</Text>
					 <Text style = {styles.titleex}>Kota: {this.state.Kota}</Text>
					 <Text style = {styles.titleex}>NIK: {this.state.NIK}</Text>
					 <Text style = {styles.titleex}>Nama: {this.state.Nama}</Text>
					 <Text style = {styles.titleex}>Tempat_Tgl_Lahir: {this.state.Tempat_Tgl_Lahir}</Text>
					 <Text style = {styles.titleex}>Jenis_Kelamin: {this.state.Jenis_Kelamin}</Text>
					 <Text style = {styles.titleex}>Golongan_Darah: {this.state.Golongan_Darah}</Text>
					 <Text style = {styles.titleex}>Alamat: {this.state.Alamat}</Text>
					 <Text style = {styles.titleex}>Status_Perkawinan: {this.state.Status_Perkawinan}</Text>
					 <Text style = {styles.titleex}>Pekerjaan: {this.state.Pekerjaan}</Text>
					 <Text style = {styles.titleex}>Kewarganegaraan: {this.state.Kewarganegaraan}</Text>
					 <Text style = {styles.titleex}>Berlaku_Hingga: {this.state.Berlaku_Hingga}</Text>
					  <Text style = {styles.titleexx}> {this.state.valid}</Text>
					 <Text style= {styles.title}>This is your picture :</Text>
					 <Image style = {styles.logoex} source={{uri: "file://" + path}} />                                                                 
						<Text style={styles.title}>OCR Again? </Text>
					 <TouchableOpacity onPress = {this.Start} style = {styles.buttonContainer}>
					 <Text style= {styles.titlebold}>Press Here</Text>
					 </TouchableOpacity>
				</View>
				<View style = {styles.formContainer}>

				</View>
			</View>
			</KeyboardAvoidingView>
			);
	}

} 

const styles = StyleSheet.create( {
		signupContainer: {
			flexDirection: 'row',
			justifyContent: 'center',
			marginBottom : 20,
			alignItems : 'flex-end'
		},
		signupText: {
			fontSize: 15,
			color : 'white'

		},
		signUptext: {
			color : 'white',
			fontWeight: '700',
			fontSize : 17,
		},

		background: { flex: 1,
						backgroundColor : '#3498db'
						},

		logoContainer:{
			alignItems: 'center',
			flexGrow: 1,
			justifyContent: 'center',
		},

		logo: {
			width: 200,
			height: 200
		},
		logoex: {
			width: 200,
			height: 100
		},
		image: {
			width: 250,
			marginTop: 50,
			height: 100
		},
		titlebold: {
			color: 'white',
			marginTop: 10,
			width: 190,
			opacity: 0.9,
			fontSize: 18,
			fontWeight: 'bold',
			textAlign: 'center'
		},

		title: {
			color: 'white',
			marginTop: 10,
			width: 190,
			opacity: 0.9,
			fontSize: 15,
			textAlign: 'center'
		},
		titleex: {
			color: 'white',
			marginTop: 2,
			width: 300,
			fontSize: 15,
			textAlign: 'center'
		},
		titleexx: {
			color: 'red',
			marginTop: 2,
			width: 300,
			fontSize: 15,
			textAlign: 'center'
		},
		example: {
			color: 'white',
			marginTop: 10,
			width: 190,
			opacity: 0.9,
			fontSize: 15,
			textAlign: 'center'
		},
				buttonContainer: {
			backgroundColor : '#2980b9',
			paddingVertical : 5,
			marginTop : 7
			
		},

		formContainer: { 
		}

		});	
