export const CONTACT = {
  HEADER_COMMENT: { en: "/* contact.css – let's build something */", es: "/* contact.css – construyamos algo */" },
  HEADING: { en: 'Contact', es: 'Contacto' },
  SUBHEADING: { en: '// open to work, collabs & good conversations', es: '// abierto a trabajo, colaboraciones y buenas conversaciones' },
  FIND_ME_TITLE: { en: 'FIND ME ON', es: 'ENCUÉNTRAME EN' },
  MESSAGE_TITLE: { en: 'SEND A MESSAGE', es: 'ENVIA UN MENSAJE' },
  SUBMIT_LABEL: { en: '→ send_message()', es: '→ enviar_mensaje()' },
  FOOTER_NOTE: { en: '// Powered by Formspree (lands directly in my inbox) :p', es: '// Potenciado por Formspree (llega directo a mi bandeja) :p' },
  FORMSPREE_ACTION: 'https://formspree.io/f/xdalrwwa',
};

export const SOCIAL_LINKS = [
  {
    id: 'github',
    icon: 'Github',
    label: 'GitHub',
    url: 'https://github.com/josuechaves01',
    username: '@JosueChaves01',
    color: '#e5e7eb',
  },
  {
    id: 'linkedin',
    icon: 'Linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/josue-chaves-465ba823a/',
    username: 'Josué Chaves',
    color: '#0077b5',
  },
  {
    id: 'email',
    icon: 'Mail',
    label: { en: 'Email', es: 'Correo' },
    url: 'mailto:josuechaves.dev@gmail.com',
    username: 'chavesjosue01@gmail.com',
    color: '#ea4335',
  },
  { id: 'youtube', platform: 'YOUTUBE', display: 'youtube.com/@josue.chaves9270', url: 'https://www.youtube.com/@josue.chaves9270', icon: 'Youtube', color: '#FF0000' },
  { id: 'instagram', platform: 'INSTAGRAM', display: 'instagram.com/josue_chaves__', url: 'https://www.instagram.com/josue_chaves__', icon: 'Instagram', color: '#E4405F' },
];

export const FORM_FIELDS = [
  { id: 'name', name: 'name', label: '// YOUR_NAME *', type: 'text', placeholder: 'string', required: true, multiline: false },
  { id: 'email', name: 'email', label: '// YOUR_EMAIL *', type: 'email', placeholder: 'string', required: true, multiline: false },
  { id: 'subject', name: 'subject', label: '// SUBJECT', type: 'text', placeholder: 'string', required: false, multiline: false },
  { id: 'message', name: 'message', label: '// MESSAGE *', type: 'text', placeholder: 'your message', required: true, multiline: true },
];
