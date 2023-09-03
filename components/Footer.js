import { useState, useEffect } from "react";
import fetchFooter from '@/lib/content'
import fetchContent from "@/lib/content";

const Footer = () => {
	const [footerText, setFooterText] = useState("");

  const getFooterText = async () => {
		const contentData = await fetchContent('footer');
	  contentData && setFooterText(contentData.value);
  };

  useEffect(() => {
	getFooterText();
  });

	return (
	<footer className="py-3 border-top bg-dark bg-gradient">
		<p className="text-center text-light" dangerouslySetInnerHTML={{ __html: footerText }}/>
	</footer>
	)
}

export default Footer