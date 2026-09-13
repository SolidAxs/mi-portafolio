import { Component, Input, computed } from '@angular/core';

@Component({
  selector: 'app-tech-icon',
  standalone: true,
  template: `
    <span class="tech-icon-wrap" [style.width.px]="size" [style.height.px]="size">
      @switch (iconKey()) {
        <!-- ── FRONTEND & MOBILE ── -->
        @case ('angular') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 5.5l1.5 12.5L12 22l8.5-4L22 5.5 12 2z" fill="#E23237"/>
            <path d="M12 2v20l8.5-4L22 5.5 12 2z" fill="#B52E31"/>
            <path d="M12 4.6L5.8 17h2.4l1.3-3.2h5l1.3 3.2h2.4L12 4.6zm1.7 7.3h-3.4L12 7.7l1.7 4.2z" fill="#FFFFFF"/>
          </svg>
        }
        @case ('react') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" stroke-width="1.6" transform="rotate(30 12 12)"/>
            <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" stroke-width="1.6" transform="rotate(90 12 12)"/>
            <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" stroke-width="1.6" transform="rotate(150 12 12)"/>
            <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
          </svg>
        }
        @case ('typescript') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="4" fill="#3178C6"/>
            <path d="M11.5 8.5v1.8H9.2v6.2H7.2v-6.2H5V8.5h6.5zm3.8 4.3c.7.4 1.3.8 1.3 1.5 0 .8-.7 1.2-1.6 1.2-1 0-1.8-.5-2.2-1.1l-1.3 1.2c.8 1.1 2 1.6 3.5 1.6 2.2 0 3.6-1.2 3.6-2.8 0-1.5-1-2.2-2.4-2.8l-.8-.3c-.6-.3-.9-.6-.9-1 0-.5.4-.9 1.2-.9.8 0 1.4.3 1.8.8l1.3-1.1c-.7-.9-1.7-1.3-3.1-1.3-2 0-3.3 1.2-3.3 2.6 0 1.4.9 2.1 2.2 2.6l.8.4z" fill="#FFFFFF"/>
          </svg>
        }
        @case ('javascript') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
            <path d="M6 18.5l1.6-.9c.4.8.9 1.4 1.7 1.4.8 0 1.3-.3 1.3-1.2v-7.3h2v7.3c0 2-1.2 2.9-3.2 2.9-1.8 0-2.8-.9-3.4-2.2zm8.5-.2l1.6-.9c.5.8 1.2 1.3 2.1 1.3 1 0 1.6-.5 1.6-1.2 0-.8-.7-1.1-1.8-1.6l-.6-.3c-1.8-.7-2.9-1.6-2.9-3.5 0-1.8 1.4-3.1 3.5-3.1 1.5 0 2.6.5 3.3 1.8l-1.5.9c-.4-.7-.9-1-1.8-1-.8 0-1.4.5-1.4 1.1 0 .7.6 1 1.5 1.4l.6.3c2 .9 3.2 1.8 3.2 3.8 0 2.2-1.7 3.3-3.8 3.3-2.1 0-3.4-1-4-2.3z" fill="#000000"/>
          </svg>
        }
        @case ('html') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <path d="M4 2.5l1.6 18 6.4 1.8 6.4-1.8 1.6-18H4z" fill="#E34F26"/>
            <path d="M12 4.1v16.3l5-1.4 1.3-14.9H12z" fill="#EF652A"/>
            <path d="M12 7.7H7.7l.3 3.3h4V7.7zm0 6.6H9.4l-.2-2.2h-2l.4 4.4 4.4 1.2V14.3zm0-3.3h3.8l-.4 4.4-3.4.9v-2.1l1.5-.4.2-1.8H12V11zm0-3.3v2.1h4.2l.2-2.1H12z" fill="#FFFFFF"/>
          </svg>
        }
        @case ('css') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <path d="M4 2.5l1.6 18 6.4 1.8 6.4-1.8 1.6-18H4z" fill="#1572B6"/>
            <path d="M12 4.1v16.3l5-1.4 1.3-14.9H12z" fill="#33A9DC"/>
            <path d="M12 7.7H7.7l.3 3.3h4V7.7zm0 6.6H9.4l-.2-2.2h-2l.4 4.4 4.4 1.2V14.3zm0-3.3h3.8l-.4 4.4-3.4.9v-2.1l1.5-.4.2-1.8H12V11zm0-3.3v2.1h4.2l.2-2.1H12z" fill="#FFFFFF"/>
          </svg>
        }
        @case ('sass') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="4" fill="#CC6699"/>
            <path d="M12 6.5c-3.5 0-5.5 2-5.5 3.5 0 2.5 3.5 2.5 3.5 4s-1.5 2-3 2c-1 0-1.8-.5-2.2-1l-1 1.2c.7.9 1.8 1.6 3.2 1.6 3 0 5-1.7 5-3.8 0-2.8-3.5-2.8-3.5-4.2s1.2-1.7 2.5-1.7c1 0 1.8.4 2.3.8l.8-1.4c-.8-.7-2-1-3.1-1z" fill="#FFFFFF"/>
          </svg>
        }
        @case ('bootstrap') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="5" fill="#7952B3"/>
            <path d="M8 6h4.5c2.2 0 3.5 1.1 3.5 2.6 0 1.2-.7 2-1.8 2.3 1.4.3 2.3 1.3 2.3 2.7 0 1.8-1.5 3-3.8 3H8V6zm2.4 4.3h2c.8 0 1.4-.4 1.4-1.1 0-.7-.6-1-1.4-1h-2v2.1zm0 4.3h2.3c.9 0 1.6-.4 1.6-1.2 0-.8-.7-1.2-1.6-1.2h-2.3v2.4z" fill="#FFFFFF"/>
          </svg>
        }
        @case ('tailwindcss') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <path d="M12 6c-3 0-4.5 1.5-4.5 4.5 1-1.5 2.2-2 3.8-1.5 1 .3 1.6 1 2.4 1.8C15 12 16.5 13.5 19.5 13.5c3 0 4.5-1.5 4.5-4.5-1 1.5-2.2 2-3.8 1.5-1-.3-1.6-1-2.4-1.8C16.5 7.5 15 6 12 6zM4.5 13.5C1.5 13.5 0 15 0 18c1-1.5 2.2-2 3.8-1.5 1 .3 1.6 1 2.4 1.8C7.5 19.5 9 21 12 21c3 0 4.5-1.5 4.5-4.5-1 1.5-2.2 2-3.8 1.5-1-.3-1.6-1-2.4-1.8C9 15 7.5 13.5 4.5 13.5z" fill="#38BDF8"/>
          </svg>
        }
        @case ('material ui') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l-7 4v12l7 4 7-4V6l-7-4zm0 2.3l4.8 2.7L12 9.7 7.2 7 12 4.3zM6.6 8.5L11 11v8.5l-4.4-2.5V8.5zm6.4 8.5V11l4.4-2.5v8.5L13 17z" fill="#007FFF"/>
          </svg>
        }
        @case ('nextjs') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#000000" stroke="#004f68" stroke-width="1"/>
            <path d="M8 8v8h2V11.2l5.5 6.4c.5-.4 1-.8 1.5-1.3L9.7 8H8z" fill="#FFFFFF"/>
            <rect x="14.5" y="8" width="2" height="5.5" fill="#FFFFFF"/>
          </svg>
        }
        @case ('remix') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="4" fill="#121212"/>
            <path d="M6 6h6.5c2.5 0 4 1.2 4 3.2 0 1.5-.9 2.5-2.2 2.9L18 18h-3.2l-3.3-5.3H9V18H6V6zm3 4.6h3.2c.9 0 1.5-.4 1.5-1.1s-.6-1.1-1.5-1.1H9v2.2z" fill="#E8F4F8"/>
          </svg>
        }
        @case ('flutter') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <path d="M13.5 2L4 11.5l3.5 3.5L20.5 2h-7z" fill="#02569B"/>
            <path d="M13.5 11.5L8.5 16.5l3.5 3.5 5-5-3.5-3.5z" fill="#0175C2"/>
            <path d="M17 15l-3.5 3.5 3.5 3.5h7l-7-7z" fill="#54C5F8"/>
          </svg>
        }
        @case ('dart') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <path d="M4 4l9 9-4.5 4.5L2 11 4 4z" fill="#0175C2"/>
            <path d="M13 13l7-7-4.5-2L8.5 11 13 13z" fill="#02569B"/>
            <path d="M8.5 17.5L13 22l7-7-7-2-4.5 4.5z" fill="#54C5F8"/>
          </svg>
        }
        @case ('xamarin forms') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="5" fill="#3498DB"/>
            <path d="M6 6l5 6-5 6h3l3.5-4.5L16 18h3l-5-6 5-6h-3l-3.5 4.5L9 6H6z" fill="#FFFFFF"/>
          </svg>
        }
        @case ('blazor') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="5" fill="#512BD4"/>
            <path d="M8 5h5c2.5 0 4 1.2 4 3 0 1.2-.7 2.2-1.8 2.6 1.4.4 2.3 1.5 2.3 3 0 2-1.6 3.4-4.2 3.4H8V5zm2.8 4.2h2.2c.8 0 1.3-.4 1.3-1s-.5-1-1.3-1h-2.2v2zm0 5h2.5c.9 0 1.5-.4 1.5-1.1 0-.7-.6-1.1-1.5-1.1h-2.5v2.2z" fill="#FFFFFF"/>
          </svg>
        }

        <!-- ── BACKEND & .NET ── -->
        @case ('.net') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#512BD4"/>
            <path d="M6.5 15.5l3-7h1.6l3 7h-1.6l-.7-1.8H9.2l-.7 1.8H6.5zm3.2-3.2h1.6l-.8-2.2-.8 2.2zm6.3 3.2v-7h1.6v5.5H20v1.5H16z" fill="#FFFFFF"/>
          </svg>
        }
        @case ('.net framework') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="5" fill="#512BD4"/>
            <path d="M5 8h4c1.8 0 3 .9 3 2.5 0 1.2-.7 2-1.8 2.3L13 17h-2.2l-2.4-3.8H7V17H5V8zm2 3.5h2c.6 0 1-.3 1-.8 0-.6-.4-.8-1-.8H7v1.6z" fill="#FFFFFF"/>
            <text x="14" y="16" fill="#41BBD9" font-size="7" font-weight="bold">FW</text>
          </svg>
        }
        @case ('asp.net core') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="5" fill="#512BD4"/>
            <circle cx="12" cy="12" r="7" stroke="#41BBD9" stroke-width="1.5" fill="none"/>
            <path d="M7 12h10M12 7v10" stroke="#FFFFFF" stroke-width="1.5"/>
          </svg>
        }
        @case ('entity framework') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="5" fill="#68217A"/>
            <path d="M7 6h10v3H7V6zm0 5h10v3H7v-3zm0 5h10v3H7v-3z" fill="#41BBD9"/>
            <path d="M10 9v2M14 14v2" stroke="#FFFFFF" stroke-width="1.5"/>
          </svg>
        }
        @case ('c#') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l8.5 4.9v9.8L12 21.6 3.5 16.7V6.9L12 2z" fill="#9B4993"/>
            <path d="M9.5 9c-.8 0-1.5.5-1.5 1.5v3c0 1 .7 1.5 1.5 1.5.7 0 1.2-.3 1.5-.7l1 1c-.6.8-1.5 1.2-2.5 1.2-2 0-3.2-1.3-3.2-3v-3c0-1.7 1.2-3 3.2-3 1 0 1.9.4 2.5 1.2l-1 1c-.3-.4-.8-.7-1.5-.7zm5 1.5h1.2v-1.5h1.2v1.5h1.2v1.2h-1.2v1.6h1.2v1.2h-1.2v1.5h-1.2v-1.5h-1.2v-1.2h1.2v-1.6h-1.2v-1.2zm1.2 2.8h1.2v-1.6h-1.2v1.6z" fill="#FFFFFF"/>
          </svg>
        }
        @case ('node.js') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2z" fill="#339933"/>
            <path d="M12 6.5l6 3.5v7l-6 3.5-6-3.5V10l6-3.5z" fill="#026E00"/>
            <path d="M12 9.5l3 1.7v3.6L12 16.5l-3-1.7v-3.6l3-1.7z" fill="#FFFFFF"/>
          </svg>
        }
        @case ('python') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <path d="M11.9 2c-3.1 0-5.1.7-5.1 2.8V6h5.3v.8H4.6C2.5 6.8 2 8.7 2 10.9c0 2.2 1.4 3.7 3.5 3.7h1.4v-1.8c0-1.8 1.4-3.2 3.2-3.2h5.3V7.1c0-2.1-2.4-5.1-5.5-5.1zm-1.8 1.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z" fill="#3776AB"/>
            <path d="M12.1 22c3.1 0 5.1-.7 5.1-2.8V18h-5.3v-.8h7.5c2.1 0 2.6-1.9 2.6-4.1 0-2.2-1.4-3.7-3.5-3.7h-1.4v1.8c0 1.8-1.4 3.2-3.2 3.2H8.6v2.5c0 2.1 2.4 5.1 5.5 5.1zm1.8-1.5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" fill="#FFD43B"/>
          </svg>
        }
        @case ('fastapi') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#009688"/>
            <path d="M13 3L6 13h5l-2 8 9-11h-5l2-7z" fill="#FFFFFF"/>
          </svg>
        }
        @case ('flask') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <path d="M10 3h4v3.5l4.5 8.5c1 1.8-.3 4-2.5 4H8c-2.2 0-3.5-2.2-2.5-4L10 6.5V3z" stroke="#004f68" stroke-width="2" fill="none"/>
            <line x1="8.5" y1="3" x2="15.5" y2="3" stroke="#004f68" stroke-width="2"/>
            <path d="M7 15h10l-1.5 3H8.5L7 15z" fill="#41BBD9"/>
          </svg>
        }

        <!-- ── DATA & DATABASES ── -->
        @case ('pandas') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="4" height="16" rx="2" fill="#150458"/>
            <rect x="10" y="8" width="4" height="12" rx="2" fill="#E70488"/>
            <rect x="17" y="5" width="4" height="15" rx="2" fill="#FFD43B"/>
          </svg>
        }
        @case ('numpy') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="4" fill="#013243"/>
            <path d="M6 6h2.5l5.5 8V6h2.5v12H14L8.5 10v8H6V6z" fill="#4DABCF"/>
          </svg>
        }
        @case ('postgresql') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#336791"/>
            <path d="M12 4c-3.5 0-6 2.5-6 6 0 2 .8 3.8 2 5v3l2-1.5 2 1.5v-3c2 0 4-1.5 4-4 0-1-.5-2-1-2.5 1-.5 1-1.5 1-2.5 0-1.1-.9-2-2-2h-2zm-1 3.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5z" fill="#FFFFFF"/>
          </svg>
        }
        @case ('sql server') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <path d="M12 3c-5 0-9 1.3-9 3v12c0 1.7 4 3 9 3s9-1.3 9-3V6c0-1.7-4-3-9-3z" fill="#CC292B"/>
            <ellipse cx="12" cy="6" rx="9" ry="3" fill="#E65100"/>
            <path d="M3 10c0 1.7 4 3 9 3s9-1.3 9-3M3 14c0 1.7 4 3 9 3s9-1.3 9-3" stroke="#FFFFFF" stroke-width="1.2" fill="none"/>
          </svg>
        }
        @case ('oracle db') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="5" width="20" height="14" rx="7" fill="#F80000"/>
            <ellipse cx="12" cy="12" rx="6.5" ry="3.5" fill="#FFFFFF"/>
            <ellipse cx="12" cy="12" rx="4.5" ry="2" fill="#F80000"/>
          </svg>
        }
        @case ('mysql') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#00758F"/>
            <path d="M17 9c-1-2-3-3.5-5.5-3.5-3.5 0-6.5 3-6.5 6.5 0 2.5 1.5 4.8 3.5 5.8v-2.2c-1-.7-1.8-2-1.8-3.6 0-2.3 2-4.2 4.5-4.2 1.8 0 3.3 1 4 2.4l1.8-1.2z" fill="#F29111"/>
          </svg>
        }
        @case ('sqlite') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#003B57"/>
            <path d="M7 6h6c3 0 5 1.5 5 4s-2 4-5 4H9v4H7V6zm2 6h4c1.5 0 2.5-.8 2.5-2s-1-2-2.5-2H9v4z" fill="#41BBD9"/>
          </svg>
        }
        @case ('mongodb') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C10 5 5 9.5 5 14c0 3.8 3.1 7 7 7s7-3.2 7-7c0-4.5-5-9-7-12zm.2 17.5v-7.3c0-.1.1-.2.2-.2 1.3.8 2.6 2 2.6 4.2 0 2.1-1.3 3.3-2.8 3.3z" fill="#47A248"/>
          </svg>
        }
        @case ('elasticsearch') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#005571"/>
            <path d="M6 10h12v4H6z" fill="#FEC514"/>
            <path d="M7.5 7h9a4.5 4.5 0 00-9 0z" fill="#00BFB3"/>
            <path d="M7.5 17h9a4.5 4.5 0 01-9 0z" fill="#00BFB3"/>
          </svg>
        }

        <!-- ── CLOUD, DEVOPS & APIS ── -->
        @case ('docker') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <path d="M22 12.5c-.3-.2-1.3-.3-2-.1-.5-1.2-1.6-2-3-2-.3 0-.6 0-.8.1-.5-1.3-1.8-2.2-3.3-2.2H6v3.7H3.5C2.1 12 1 13.1 1 14.5c0 3.5 3 6.5 8 6.5 5.5 0 9.8-3.4 10.6-8.5.8 0 1.7-.3 2.4-1.2v1.2z" fill="#2496ED"/>
            <rect x="7" y="9.5" width="2" height="2" fill="#FFFFFF"/>
            <rect x="9.5" y="9.5" width="2" height="2" fill="#FFFFFF"/>
            <rect x="12" y="9.5" width="2" height="2" fill="#FFFFFF"/>
            <rect x="9.5" y="7" width="2" height="2" fill="#FFFFFF"/>
          </svg>
        }
        @case ('docker compose') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="4" fill="#1D63ED"/>
            <rect x="4" y="6" width="6" height="5" rx="1" fill="#FFFFFF"/>
            <rect x="14" y="6" width="6" height="5" rx="1" fill="#FFFFFF"/>
            <rect x="9" y="13" width="6" height="5" rx="1" fill="#41BBD9"/>
          </svg>
        }
        @case ('azure') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <path d="M5.5 19h13l-4-7.5-3.5 4.5-2.5-3.5L5.5 19z" fill="#0078D4"/>
            <path d="M12.5 3.5L5.5 16h3.5l4.5-8 4.5 8h3.5L12.5 3.5z" fill="#50E6FF"/>
          </svg>
        }
        @case ('az-900') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l7 3v6c0 5-3 9.5-7 11-4-1.5-7-6-7-11V5l7-3z" fill="#0078D4"/>
            <path d="M12 4l5 2.2v4.8c0 4-2.5 7.5-5 8.8-2.5-1.3-5-4.8-5-8.8V6.2L12 4z" fill="#002050"/>
            <path d="M12 6.5l1.2 2.8 3 .3-2.3 2 0.7 3-2.6-1.5-2.6 1.5 0.7-3-2.3-2 3-.3L12 6.5z" fill="#F18F01"/>
          </svg>
        }
        @case ('graphql') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2z" stroke="#E10098" stroke-width="1.8"/>
            <circle cx="12" cy="4" r="2" fill="#E10098"/>
            <circle cx="20" cy="8" r="2" fill="#E10098"/>
            <circle cx="20" cy="16" r="2" fill="#E10098"/>
            <circle cx="12" cy="20" r="2" fill="#E10098"/>
            <circle cx="4" cy="16" r="2" fill="#E10098"/>
            <circle cx="4" cy="8" r="2" fill="#E10098"/>
          </svg>
        }
        @case ('rest apis') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="5" fill="#006E90"/>
            <path d="M6 13h4M14 13h4M10 9l2-3 2 3M10 17l2 3 2-3" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        }

        <!-- ── AI & TOOLS ── -->
        @case ('codex') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="5" fill="#10A37F"/>
            <path d="M8 8l-3 4 3 4M16 8l3 4-3 4M13 7l-2 10" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
          </svg>
        }
        @case ('claude code') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="5" fill="#D97706"/>
            <path d="M12 4l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" fill="#FFFFFF"/>
          </svg>
        }
        @case ('antigravity') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="5" fill="#006E90"/>
            <path d="M12 3l2 5h4l-3 3 1 5-4-3-4 3 1-5-3-3h4l2-5z" fill="#41BBD9"/>
          </svg>
        }
        @case ('chatgpt') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#10A37F"/>
            <path d="M12 6a3 3 0 013 3v1h1a3 3 0 013 3 3 3 0 01-1.5 2.6l-.8.5.5.8A3 3 0 0115 20a3 3 0 01-3-3v-1h-1a3 3 0 01-3-3 3 3 0 011.5-2.6l.8-.5-.5-.8A3 3 0 019 6h3z" stroke="#FFFFFF" stroke-width="1.2" fill="none"/>
          </svg>
        }
        @case ('gemini') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C12 7.5 7.5 12 2 12c5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z" fill="url(#geminiGrad)"/>
            <defs>
              <linearGradient id="geminiGrad" x1="0" y1="0" x2="24" y2="24">
                <stop offset="0%" stop-color="#1A73E8"/>
                <stop offset="100%" stop-color="#8E24AA"/>
              </linearGradient>
            </defs>
          </svg>
        }
        @case ('github') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7 0-.3-.4-1.3.1-2.6 0 0 .8-.3 2.8 1a9.6 9.6 0 015 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.6.7.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7 1 .7 2v2.9c0 .3.2.6.7.5C19.1 20.2 22 16.4 22 12c0-5.5-4.5-10-10-10z" fill="#24292E"/>
          </svg>
        }
        @case ('gitlab') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <path d="M12 21.5L2 14.2 3.5 3.5 7 14.2h10l3.5-10.7L22 14.2 12 21.5z" fill="#E24329"/>
            <path d="M12 21.5L7 14.2h10l-5 7.3z" fill="#FC6D26"/>
            <path d="M12 21.5L2 14.2h5l5 7.3zm0 0l10-7.3h-5l-5 7.3z" fill="#FCA326"/>
          </svg>
        }
        @case ('bitbucket') {
          <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none">
            <path d="M3 4l2.5 15.5c.2 1 1 1.8 2 1.8h9c1 0 1.8-.8 2-1.8L21 4H3zm10 11.5H9.5L8.5 9h7l-1 6.5z" fill="#0052CC"/>
          </svg>
        }

        <!-- ── ARQUITECTURA & PRINCIPIOS ── -->
        @case ('principios solid') {
          <span class="custom-emoji">📐</span>
        }
        @case ('principios kiss') {
          <span class="custom-emoji">⚡</span>
        }
        @case ('principios dry') {
          <span class="custom-emoji">♻️</span>
        }
        @case ('clean architecture') {
          <span class="custom-emoji">🏛️</span>
        }
        @case ('test-driven development (tdd)') {
          <span class="custom-emoji">🧪</span>
        }
        @case ('domain-driven design (ddd)') {
          <span class="custom-emoji">🎯</span>
        }

        <!-- Fallback Default -->
        @default {
          <span class="default-badge">{{ fallbackText() }}</span>
        }
      }
    </span>
  `,
  styles: [`
    .tech-icon-wrap {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      vertical-align: middle;
    }
    .custom-emoji {
      font-size: 1.15rem;
      line-height: 1;
      display: inline-block;
    }
    .default-badge {
      font-size: 0.65rem;
      font-weight: 800;
      color: var(--palette-ocean);
      background: rgba(0, 110, 144, 0.12);
      border-radius: 4px;
      padding: 1px 4px;
      text-transform: uppercase;
      font-family: monospace;
    }
  `],
})
export class TechIconComponent {
  @Input({ required: true }) name!: string;
  @Input() size = 18;

  readonly iconKey = computed(() => {
    return (this.name || '').trim().toLowerCase();
  });

  readonly fallbackText = computed(() => {
    const n = (this.name || '').trim();
    if (n.length <= 3) return n;
    return n.slice(0, 2).toUpperCase();
  });
}
