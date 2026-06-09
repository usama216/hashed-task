function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden>
      <path d="M10.6 7.7L16.5 1h-1.4l-5.1 5.9L5.8 1H1l6.2 9L1 17h1.4l5.4-6.2 4.3 6.2H17l-6.4-9.3z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden>
      <path d="M10.5 9.3h2.4l.3-2.8H10.5V5.1c0-.8.2-1.4 1.4-1.4h1.5V1.2C12.9 1.1 12 1 11.1 1 9 1 7.6 2.1 7.6 4.8v1.7H5.5v2.8h2.1V17h2.9V9.3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden>
      <path d="M9 4.8a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4zm0 6.9a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4zm5.3-7a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 2.2c2.2 0 2.5 0 3.4.1.8 0 1.3.2 1.6.3.4.2.7.4 1 .7.3.3.5.6.7 1 .1.3.3.8.3 1.6.1.9.1 1.2.1 3.4s0 2.5-.1 3.4c0 .8-.2 1.3-.3 1.6-.2.4-.4.7-.7 1-.3.3-.6.5-1 .7-.3.1-.8.3-1.6.3-.9.1-1.2.1-3.4.1s-2.5 0-3.4-.1c-.8 0-1.3-.2-1.6-.3-.4-.2-.7-.4-1-.7-.3-.3-.5-.6-.7-1-.1-.3-.3-.8-.3-1.6-.1-.9-.1-1.2-.1-3.4s0-2.5.1-3.4c0-.8.2-1.3.3-1.6.2-.4.4-.7.7-1 .3-.3.6-.5 1-.7.3-.1.8-.3 1.6-.3.9-.1 1.2-.1 3.4-.1zm0-2.2C6.7 0 6.4 0 5.5.1 4.6.1 4 .3 3.5.5c-.6.2-1 .5-1.5 1-.4.4-.8.9-1 1.5-.2.5-.4 1.1-.4 2-.1.9-.1 1.2-.1 3.5s0 2.6.1 3.5c0 .9.2 1.5.4 2 .2.6.5 1.1 1 1.5.4.4.9.8 1.5 1 .5.2 1.1.4 2 .4.9.1 1.2.1 3.5.1s2.6 0 3.5-.1c.9 0 1.5-.2 2-.4.6-.2 1.1-.5 1.5-1 .4-.4.8-.9 1-1.5.2-.5.4-1.1.4-2 .1-.9.1-1.2.1-3.5s0-2.6-.1-3.5c0-.9-.2-1.5-.4-2-.2-.6-.5-1.1-1-1.5-.4-.4-.9-.8-1.5-1-.5-.2-1.1-.4-2-.4C11.6 0 11.3 0 9 0z" />
    </svg>
  );
}

const socials = [
  { label: "X", href: "#", Icon: XIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
];

export function FooterSocial() {
  return (
    <div className="flex items-center gap-5">
      {socials.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="text-white transition-opacity hover:opacity-70"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
