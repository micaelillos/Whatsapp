import Loader from 'react-loader-spinner'
export default class Spinner extends React.Component {
 //other logic
   render() {
    return(
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",alignSelf:"center",alignItems:"center"}}>
     <Loader
        type="Rings"
        color="#000"
        height={200}
        width={200}
      

     />
     <h1> Gettting things ready ..</h1>
     </div>
    );
   }
}