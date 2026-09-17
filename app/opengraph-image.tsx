import {ImageResponse} from 'next/og';

export const runtime='edge';
export const alt='Ampliga — strategy, design, technology, AI and growth';
export const size={width:1200,height:630};
export const contentType='image/png';

export default function OpenGraphImage(){
 return new ImageResponse(
  <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'68px 72px',background:'#111',color:'#FBF9EF',fontFamily:'Arial, sans-serif'}}>
   <div style={{display:'flex',fontSize:38,fontWeight:700,letterSpacing:'-1px'}}>AMPLIGA</div>
   <div style={{display:'flex',flexDirection:'column',fontSize:82,lineHeight:.94,letterSpacing:'-5px'}}>
    <span>We build brands, experiences</span>
    <span>and growth systems.</span>
   </div>
   <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:24,color:'#b9b6ae'}}>
    <span>Strategy · Design · Technology · AI</span>
    <span style={{color:'#DD1112'}}>ampliga.com ↗</span>
   </div>
  </div>,
  size
 );
}
