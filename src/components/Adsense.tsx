import { CSSProperties } from "react";
import appConfig from "src/shared/config/app.config";

interface IAdsenseProps {
  slot?: string;
  layout?: string;
  layoutKey?: string;
  style?: CSSProperties;
}

const Adsense: React.FC<IAdsenseProps> = ({ slot, layout, layoutKey, style }) => {
  return (
    <ins
      className="block adsbygoogle"
      data-ad-client={appConfig.google.adsense.client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-ad-layout={layout}
      data-ad-layout-key={layoutKey}
      data-full-width-responsive={true}
      style={style}
    />
  );
};

export default Adsense;
