// Design Tokens extracted from Figma
export const designTokens = {
  // Colors
  colors: {
    // Backgrounds
    darkBg: "#181e24",
    darkBg2: "#171e24",
    darkBg3: "#1b2229",
    borderDark: "#121212",
    
    // Text
    white: "#ffffff",
    textLight: "#c9d7e1",
    orange: "#ffa953",
    orangeAlt: "#cc934e",
    
    // Socket Screw
    socketBlue: "#13243c",
    socketBlack: "#111518",
    embossSoftWhite: "rgba(226,239,255,0.15)",
    
    // Gradients
    gradientDark: {
      from: "#171e24",
      to: "#1b2229",
    },
    gradientText: {
      from: "#ffffff",
      to: "#c9d7e1",
    },
    gradientOverlay: "linear-gradient(rgba(128, 128, 128, 0.6) 0%, rgb(128, 128, 128) 19.684%, rgba(128, 128, 128, 0.3) 70.46%, rgb(128, 128, 128) 100%)",
    gradientBackground: "linear-gradient(rgb(206, 216, 219) 0%, rgb(173, 189, 190) 100%), linear-gradient(90deg, rgb(245, 245, 245) 0%, rgb(245, 245, 245) 100%)",
  },
  
  // Typography
  typography: {
    spaceMono: {
      fontFamily: "Space_Mono",
      fontWeight: "bold",
      fontSize: "13px",
      lineHeight: "none",
      letterSpacing: "normal",
    },
    chillax: {
      fontFamily: "Chillax_Variable",
      fontWeight: "semibold",
      fontSize: "40px",
      lineHeight: 0.82,
    },
    dmSans: {
      fontFamily: "DM_Sans",
      fontWeight: "medium",
      fontSize: "14px",
      lineHeight: 1.2,
      fontVariationSettings: "'opsz' 14",
    },
    scriboPro: {
      fontFamily: "Scribo_Pro",
      fontSize: "24px",
      lineHeight: 0.82,
    },
  },
  
  // Spacing & Sizes
  sizes: {
    orangeButton: {
      width: "107px",
      height: "107px",
    },
    bluePlate: {
      width: "444px",
      height: "185px",
    },
    descriptionBox: {
      width: "400.169px",
      height: "106.916px",
    },
    socketScrew: {
      small: {
        size: "15.399px",
        innerSize: "22.525px",
        iconSize: "14.001px",
      },
    },
    breakLine: {
      width: "31.96px",
      height: "8.424px",
    },
    silverPlate: {
      width: "16px",
      height: "107px",
    },
    verticalBar: {
      width: "64.276px",
      height: "184.804px",
    },
    decorativeText: {
      width: "102.954px",
      height: "52.118px",
    },
  },
  
  // Effects
  effects: {
    // Orange Button Textures
    orangeButton: {
      metalOverlay: {
        opacity: 0.2,
        mixBlendMode: "overlay",
        inset: "0 -0.08% 0 0.57%",
      },
      grungeOverlay: {
        opacity: 0.66,
        mixBlendMode: "lighten",
        inset: "0 -0.08% 0 0",
      },
      gradientOverlay: {
        opacity: 0.7,
        mixBlendMode: "soft-light",
      },
    },
    
    // Blue Plate Textures
    bluePlate: {
      metalOverlay: {
        opacity: 0.3,
        mixBlendMode: "overlay",
        inset: "0 -0.08% 0 0.57%",
        maskPosition: "-4.147px -1.604px",
        maskSize: "447.208px 188.208px",
      },
      grungeOverlay: {
        opacity: 0.34,
        mixBlendMode: "lighten",
        maskPosition: "-1.604px",
        maskSize: "447.208px 188.208px",
      },
      gradientOverlay: {
        opacity: 0.3,
        mixBlendMode: "soft-light",
        maskPosition: "-1.604px",
        maskSize: "447.208px 188.208px",
      },
    },
    
    // Socket Screw Shadows
    socketScrew: {
      emboss: "-0.642px 0.642px 0.642px 0px rgba(226,239,255,0.15)",
      innerShadow1: "inset 0px 1.283px 1.925px 0px rgba(0,0,0,0.35)",
      innerShadow2: "inset 0px 2.567px 1.925px 0px rgba(20,23,28,0.25)",
    },
    
    // Description Box
    descriptionBox: {
      silverPlate: {
        metalOverlay: {
          opacity: 0.7,
          mixBlendMode: "overlay",
          inset: "0 -1.65%",
        },
      },
    },
  },
  
  // Positions
  positions: {
    bluePlate: {
      title: {
        left: "30px",
        top: "40px",
      },
      breakLine: {
        left: "45px",
        top: "154px",
      },
      decorativeText: {
        left: "295.4px",
        top: "92.5px",
        rotation: "341deg",
      },
      socketScrew1: {
        bottom: "17.24px",
        right: "0.39px",
      },
      socketScrew2: {
        top: "18.9px",
        right: "0.39px",
      },
    },
    descriptionBox: {
      text: {
        left: "29.58px",
        top: "27.96px",
        width: "313.969px",
      },
    },
  },
  
  // Border Radius
  borderRadius: {
    socketScrew: "640.999px",
  },
};


