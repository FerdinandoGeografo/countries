import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <p class="attribution">
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
          >Frontend Mentor</a
        >. Coded by
        <a
          href="https://www.linkedin.com/in/ferdinandogeografo/"
          target="_blank"
          >Ferdinando Geografo</a
        >.
      </p>
    </footer>
  `,
  styles: [
    `
      .footer {
        background-color: var(--color-elements);
        width: 100%;
        position: absolute;
        padding: 3rem 2rem;
        box-shadow: inset 0 0.2rem 0.4rem 0 hsla(0, 0%, 0%, 0.06);
      }

      .attribution {
        text-align: center;
        color: var(--text-color);
        font-size: 1.25rem;
      }

      .attribution a:link,
      .attribution a:visited {
        color: var(--footer-cta-color);
      }
    `,
  ],
})
export class FooterComponent { }
