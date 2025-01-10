// import { ImageResponse } from 'next/og';

// export const runtime = 'edge';

// const font = fetch(
//   new URL('../../../lib/YujiSyuku-Regular.ttf', import.meta.url)
// ).then((res) => res.arrayBuffer());

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const name = searchParams.get('name');
//     const score = searchParams.get('score');
//     const fontData = await font;

//     const baseStyles = {
//       backgroundImage:
//         'linear-gradient(180deg,  rgba(255, 191, 169, 1), rgba(255, 209, 168, 1) 0%, rgba(205, 241, 233, 1) 0%, rgba(255, 201, 169, 1) 0%, rgba(255, 249, 215, 1) 50%, rgba(255, 253, 247, 1) 77%, rgba(198, 239, 231, 1))',
//       height: '100%',
//       width: '100%',
//       display: 'flex',
//       textAlign: 'center',
//       alignItems: 'center',
//       justifyContent: name && score ? 'space-between' : 'center',
//       flexDirection: 'column',
//       flexWrap: 'nowrap',
//       color: 'rgba(125, 118, 113,0.7)',
//       fontFamily: 'Yuji Syuku',
//       padding: '0',
//       margin: '0',
//     };

//     const titleContainer = {
//       display: 'flex',
//       flexDirection: 'column',
//       backgroundColor: 'rgba(255, 255, 255, 0.5)',
//       padding: name && score ? '40px 50px' : '50px',
//       fontSize: name && score ? '70px' : '80px',
//       fontStyle: 'normal',
//       color: 'rgb(117, 98, 85)',
//       lineHeight: '1',
//       marginBottom: name && score ? '40px' : '0',
//     };

//     const content = (
//       <div style={baseStyles as React.CSSProperties}>
//         <svg
//           version="1.1"
//           xmlns="http://www.w3.org/2000/svg"
//           width="70"
//           height="40"
//           viewBox="0 0 140 80"
//           preserveAspectRatio="none"
//         >
//           <path fill="#cccccc" d="M-70-40v160h280v-160z" />
//           <path
//             fill="rgba(0, 0, 0, 0)"
//             opacity="0"
//             d="M4 1h42l21 36zM3 3l63 36h-42zM1 4l21 36-21 36zM3 77l21-36h42zM46 79h-42l63-36zM69 44v41h-24zM95 85h-24v-41zM73 43l63 36h-42zM74 41h42l21 36zM118 40l21-36v72zM137 3l-21 36h-42zM94 1h42l-63 36zM71 36v-41h24zM45-5h24v41z"
//           />
//           <path
//             fill="none"
//             stroke="#ffffff"
//             stroke-width="1.8"
//             opacity=".8"
//             d="M47 0h-47v80h47l46-80h47v80h-47zM117 40h-94l-23 40l140-80-23 40 23 40-140-80 23 40M70-5v90"
//           />
//         </svg>
//         <div style={titleContainer as React.CSSProperties}>
//           {'百人一首'.split('').map((char, index) => (
//             <span key={index}>{char}</span>
//           ))}
//         </div>
//         {name && score && (
//           <div
//             style={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               justifyContent: 'center',
//               gap: '5px',
//               fontFamily: 'Yuji Syuku',
//               marginBottom: '200px',
//               lineHeight: '1',
//             }}
//           >
//             <p style={{ margin: '0', padding: '0', fontSize: '60px' }}>
//               {name}さんのスコアは
//             </p>
//             <p style={{ margin: '0', padding: '0' }}>
//               <span
//                 style={{
//                   backgroundImage:
//                     'linear-gradient(90deg, rgb(255, 101, 77), rgb(249, 203, 40))',
//                   backgroundClip: 'text',
//                   color: 'transparent',
//                   marginRight: '5px',
//                   fontSize: '80px',
//                   fontFamily: 'Yuji Syuku',
//                 }}
//               >
//                 {score}
//               </span>
//               <span
//                 style={{
//                   color: 'rgb(249, 203, 40)',
//                   marginRight: '10px',
//                   fontSize: '40px',
//                   marginTop: '40px',
//                   fontFamily: 'Yuji Syuku',
//                 }}
//               >
//                 点
//               </span>
//               <span
//                 style={{
//                   marginRight: '5px',
//                   marginTop: '20px',
//                   fontSize: '60px',
//                   fontFamily: 'Yuji Syuku',
//                 }}
//               >
//                 です！
//               </span>
//             </p>
//           </div>
//         )}
//       </div>
//     );

//     return new ImageResponse(content, {
//       width: 1200,
//       height: 630,
//       fonts: [
//         {
//           name: 'Yuji Syuku',
//           data: fontData,
//           style: 'normal',
//         },
//       ],
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response(
//       `Failed to generate the image: ${(error as Error).message}`,
//       {
//         status: 500,
//       }
//     );
//   }
// }
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const font = fetch(
  new URL('../../../lib/YujiSyuku-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    const score = searchParams.get('score');
    const fontData = await font;

    const baseStyles = {
      backgroundImage:
        'linear-gradient(180deg,  rgba(255, 191, 169, 1), rgba(255, 209, 168, 1) 0%, rgba(205, 241, 233, 1) 0%, rgba(255, 201, 169, 1) 0%, rgba(255, 249, 215, 1) 50%, rgba(255, 253, 247, 1) 77%, rgba(198, 239, 231, 1))',
      height: '100%',
      width: '100%',
      display: 'flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: name && score ? 'space-between' : 'center',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      color: 'rgba(125, 118, 113,0.7)',
      fontFamily: 'Yuji Syuku',
      padding: '0',
      margin: '0',
      position: 'relative',
    };

    const titleContainer = {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      padding: name && score ? '40px 50px' : '50px',
      fontSize: name && score ? '70px' : '80px',
      fontStyle: 'normal',
      color: 'rgb(117, 98, 85)',
      lineHeight: '1',
      marginBottom: name && score ? '40px' : '0',
    };

    const content = (
      <div style={baseStyles as React.CSSProperties}>
        <svg
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <defs>
            <pattern
              id="backgroundPattern"
              patternUnits="userSpaceOnUse"
              width="140"
              height="80"
              //   patternTransform="scale(0.15)"
              patternTransform="scale(0.08, 0.16)"
            >
              <path fill="rgba(0, 0, 0, 0)" d="M-70-40v160h280v-160z" />
              {/* <path
                fill="rgba(0, 0, 0, 0)"
                opacity="0"
                d="M4 1h42l21 36zM3 3l63 36h-42zM1 4l21 36-21 36zM3 77l21-36h42zM46 79h-42l63-36zM69 44v41h-24zM95 85h-24v-41zM73 43l63 36h-42zM74 41h42l21 36zM118 40l21-36v72zM137 3l-21 36h-42zM94 1h42l-63 36zM71 36v-41h24zM45-5h24v41z"
              /> */}
              <path
                fill="none"
                stroke="#ffffff"
                stroke-width="1.8"
                opacity=".8"
                d="M47 0h-47v80h47l46-80h47v80h-47zM117 40h-94l-23 40l140-80-23 40 23 40-140-80 23 40M70-5v90"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#backgroundPattern)" />
        </svg>

        <div
          style={
            {
              ...titleContainer,
              position: 'relative',
              zIndex: 1,
            } as React.CSSProperties
          }
        >
          {'百人一首'.split('').map((char, index) => (
            <span key={index}>{char}</span>
          ))}
        </div>

        {name && score && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              fontFamily: 'Yuji Syuku',
              marginBottom: '200px',
              lineHeight: '1',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <p style={{ margin: '0', padding: '0', fontSize: '60px' }}>
              {name}さんのスコアは
            </p>
            <p style={{ margin: '0', padding: '0' }}>
              <span
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, rgb(255, 101, 77), rgb(249, 203, 40))',
                  backgroundClip: 'text',
                  color: 'transparent',
                  marginRight: '5px',
                  fontSize: '80px',
                  fontFamily: 'Yuji Syuku',
                }}
              >
                {score}
              </span>
              <span
                style={{
                  color: 'rgb(249, 203, 40)',
                  marginRight: '10px',
                  fontSize: '40px',
                  marginTop: '40px',
                  fontFamily: 'Yuji Syuku',
                }}
              >
                点
              </span>
              <span
                style={{
                  marginRight: '5px',
                  marginTop: '20px',
                  fontSize: '60px',
                  fontFamily: 'Yuji Syuku',
                }}
              >
                です！
              </span>
            </p>
          </div>
        )}
      </div>
    );

    return new ImageResponse(content, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Yuji Syuku',
          data: fontData,
          style: 'normal',
        },
      ],
    });
  } catch (error) {
    console.error(error);
    return new Response(
      `Failed to generate the image: ${(error as Error).message}`,
      {
        status: 500,
      }
    );
  }
}
