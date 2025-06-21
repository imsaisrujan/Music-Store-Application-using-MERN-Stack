import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to MusicStore',
  description: "We sell top musical instruments and gear",
  keywords: "music, instruments, gear"
}

export default Meta;
