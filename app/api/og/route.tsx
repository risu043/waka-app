import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    const score = searchParams.get('score');
    const rank = searchParams.get('rank');
    const baseUrl =
      process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

    const content = (
      <div
        style={{
          backgroundImage: `url(${baseUrl}/image/og-api.png)`,
          backgroundSize: 'cover',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
          color: 'rgb(117, 98, 85)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            position: 'relative',
            transform: 'translateY(100px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'center',
              fontSize: '60px',
              lineHeight: '1.2',
              transform: 'translateY(30px)',
            }}
          >
            <span>{name}さんのスコアは</span>
            <span
              style={{
                backgroundImage:
                  'linear-gradient(90deg, rgb(255, 101, 77), rgb(249, 203, 40))',
                backgroundClip: 'text',
                color: 'transparent',
                marginLeft: '10px',
                marginRight: '5px',
                fontSize: '80px',
                transform: 'translate(2px, 10px)',
              }}
            >
              {score}
            </span>
            <span
              style={{
                color: 'rgb(249, 203, 40)',
                fontSize: '40px',
              }}
            >
              点
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'center',
              fontSize: '60px',
              lineHeight: '1.2',
            }}
          >
            <span
              style={{
                backgroundImage:
                  'linear-gradient(90deg, rgb(255, 101, 77), rgb(249, 203, 40))',
                backgroundClip: 'text',
                color: 'transparent',
                marginRight: '5px',
                fontSize: '80px',
                transform: 'translate(2px, 10px)',
              }}
            >
              {rank}
            </span>
            <span
              style={{
                color: 'rgb(249, 203, 40)',
                marginRight: '10px',
                fontSize: '40px',
                transform: 'translateY(-4px)',
              }}
            >
              位
            </span>
            <span>にランクインしました！</span>
          </div>
        </div>
      </div>
    );

    return new ImageResponse(content, {
      width: 1200,
      height: 630,
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
//     const rank = searchParams.get('rank');
//     const fontData = await font;

//     const baseStyles = {
//       backgroundImage:
//         'linear-gradient(180deg,  rgba(255, 191, 169, 1), rgba(255, 209, 168, 1) 0%, rgba(205, 241, 233, 1) 0%, rgba(255, 201, 169, 1) 0%, rgba(255, 249, 215, 1) 50%, rgba(255, 253, 247, 1) 77%, rgba(198, 239, 231, 1))',
//       height: '100%',
//       width: '100%',
//       display: 'flex',
//       textAlign: 'center',
//       alignItems: 'center',
//       justifyContent: name && score ? 'space-between' : 'flex-start',
//       flexDirection: 'column',
//       flexWrap: 'nowrap',
//       color: 'rgba(125, 118, 113,0.7)',
//       fontFamily: 'Yuji Syuku',
//       padding: '0',
//       margin: '0',
//       position: 'relative',
//     };

//     const titleContainer = {
//       display: 'flex',
//       flexDirection: 'column',
//       backgroundColor: 'rgba(255, 255, 255, 0.6)',
//       boxShadow: '5px 5px 10px rgba(230, 200, 190, 0.5)',
//       padding: name && score ? '40px 50px' : '50px',
//       fontSize: name && score ? '70px' : '80px',
//       fontStyle: 'normal',
//       color: 'rgb(117, 98, 85)',
//       lineHeight: '1',
//       marginBottom: name && score ? '40px' : '0',
//     } as const;

//     const content = (
//       <div style={baseStyles as React.CSSProperties}>
//         <svg
//           width="100%"
//           height="100%"
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//           }}
//         >
//           <defs>
//             <pattern
//               id="backgroundPattern"
//               patternUnits="userSpaceOnUse"
//               width="140"
//               height="80"
//               patternTransform="scale(0.08, 0.16)"
//             >
//               <path fill="rgba(0, 0, 0, 0)" d="M-70-40v160h280v-160z" />
//               <path
//                 fill="none"
//                 stroke="#ffffff"
//                 stroke-width="1.8"
//                 opacity=".8"
//                 d="M47 0h-47v80h47l46-80h47v80h-47zM117 40h-94l-23 40l140-80-23 40 23 40-140-80 23 40M70-5v90"
//               />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#backgroundPattern)" />
//         </svg>

//         <div
//           style={{
//             ...titleContainer,
//             position: 'relative',
//           }}
//         >
//           {'百人一首'.split('').map((char, index) => (
//             <span key={index}>{char}</span>
//           ))}
//         </div>

//         {name && score && rank && (
//           <div
//             style={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               justifyContent: 'center',
//               gap: '20px',
//               fontFamily: 'Yuji Syuku',
//               marginBottom: '200px',
//               position: 'relative',
//               transform: 'translateY(-40px)',
//             }}
//           >
//             <div
//               style={{
//                 display: 'flex',
//                 alignItems: 'baseline',
//                 justifyContent: 'center',
//                 fontSize: '60px',
//                 lineHeight: '1.2',
//                 transform: 'translateY(20px)',
//               }}
//             >
//               <span>{name}さんのスコアは</span>
//               <span
//                 style={{
//                   backgroundImage:
//                     'linear-gradient(90deg, rgb(255, 101, 77), rgb(249, 203, 40))',
//                   backgroundClip: 'text',
//                   color: 'transparent',
//                   marginLeft: '10px',
//                   marginRight: '5px',
//                   fontSize: '80px',
//                   transform: 'translate(2px, -2px)',
//                 }}
//               >
//                 {score}
//               </span>
//               <span
//                 style={{
//                   color: 'rgb(249, 203, 40)',
//                   fontSize: '40px',
//                   transform: 'translateY(1px)',
//                 }}
//               >
//                 点
//               </span>
//             </div>
//             <div
//               style={{
//                 display: 'flex',
//                 alignItems: 'baseline',
//                 justifyContent: 'center',
//                 fontSize: '60px',
//                 lineHeight: '1.2',
//               }}
//             >
//               <span
//                 style={{
//                   backgroundImage:
//                     'linear-gradient(90deg, rgb(255, 101, 77), rgb(249, 203, 40))',
//                   backgroundClip: 'text',
//                   color: 'transparent',
//                   marginRight: '5px',
//                   fontSize: '80px',
//                   transform: 'translate(2px, -2px)',
//                 }}
//               >
//                 {rank}
//               </span>
//               <span
//                 style={{
//                   color: 'rgb(249, 203, 40)',
//                   marginRight: '10px',
//                   fontSize: '40px',
//                 }}
//               >
//                 位
//               </span>
//               <span>にランクインしました！</span>
//             </div>
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
