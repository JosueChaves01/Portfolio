export const CONTACT = {
  HEADER_COMMENT: "/* contact.css – let's build something */",
  HEADING: 'Contact',
  SUBHEADING: '// open to work, collabs & good conversations',
  FIND_ME_TITLE: 'FIND ME ON',
  MESSAGE_TITLE: 'SEND A MESSAGE',
  SUBMIT_LABEL: '→ send_message()',
  FOOTER_NOTE: '// Powered by Formspree (lands directly in my inbox) :p',
  FORMSPREE_ACTION: 'https://formspree.io/f/xdalrwwa',
};

export const SOCIAL_CARDS = [
  { id: 'email', platform: 'EMAIL', display: 'josuechaves.dev@gmail.com', url: 'mailto:josuechaves.dev@gmail.com', icon: 'Mail', color: '#EA4335' },
  { id: 'linkedin', platform: 'LINKEDIN', display: 'linkedin.com/in/josue-chaves-465ba823a', url: 'https://www.linkedin.com/in/josue-chaves-465ba823a/', icon: 'Linkedin', color: '#0A66C2' },
  { id: 'github', platform: 'GITHUB', display: 'github.com/josuechaves01', url: 'https://github.com/josuechaves01', icon: 'Github', color: '#8B949E' },
  { id: 'youtube', platform: 'YOUTUBE', display: 'youtube.com/@josue.chaves9270', url: 'https://www.youtube.com/@josue.chaves9270', icon: 'Youtube', color: '#FF0000' },
  { id: 'instagram', platform: 'INSTAGRAM', display: 'instagram.com/josue_chaves__', url: 'https://www.instagram.com/josue_chaves__', icon: 'Instagram', color: '#E4405F' },
];

export const FORM_FIELDS = [
  { id: 'name', name: 'name', label: '// YOUR_NAME *', type: 'text', placeholder: 'string', required: true, multiline: false },
  { id: 'email', name: 'email', label: '// YOUR_EMAIL *', type: 'email', placeholder: 'string', required: true, multiline: false },
  { id: 'subject', name: 'subject', label: '// SUBJECT', type: 'text', placeholder: 'string', required: false, multiline: false },
  { id: 'message', name: 'message', label: '// MESSAGE *', type: 'text', placeholder: 'your message', required: true, multiline: true },
];
