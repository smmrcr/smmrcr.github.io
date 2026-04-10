document.getElementById('nav-placeholder').innerHTML = `
  <style>
    .nav-list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      padding: 0;
      list-style: none;
      gap: 20px;
    }
    .hamburger-item {
      display: none; /* Hidden on desktop */
    }
    .nav-item-clock {
      margin-left: auto;
      display: flex; 
      align-items: center;
    }
    
    /* Mobile styles: Hamburger menu */
    @media (max-width: 600px) {
      .nav-list {
        gap: 0;
      }
      .logo-item {
        flex: 1; /* Pushes the clock and hamburger to the far right */
      }
      .nav-item-clock {
        margin-left: 0;
      }
      .hamburger-item {
        display: block;
        margin-left: 15px;
      }
      #hamburger-btn {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        padding: 0 5px;
        color: inherit;
        font-weight: bold;
      }
      .link-item {
        display: none; /* Hide links by default on mobile */
        width: 100%;
        padding: 5px 0;
      }
      .nav-list.active .link-item {
        display: block; /* Show links when hamburger is clicked */
      }
      .nav-list.active {
        padding-bottom: 10px;
        border-bottom: 1px solid #ccc;
      }
      .nav-list.active .link-item:first-of-type {
        margin-top: 15px;
      }
    }
  </style>
  <nav>
    <ul class="nav-list" id="nav-list">
      <li class="logo-item"><gluck>Sam Mercer</gluck></li>
      <li class="link-item"><a class="works" href="index.html">Works</a></li>
      <li class="link-item"><a class="eorh" href="eorh/index.html">The end of revision history</a></li>
      <li class="link-item"><a class="disco" href="disco.html">Disco</a></li>
      <li class="link-item"><a href="contact.html">Info</a></li>
      
      <!-- Miniature Clickable Clock -->
      <li class="nav-item-clock">
        <a href="clock.html" title="View Arrhythmic Clock" style="padding: 0; display: flex; align-items: center; text-decoration: none; border: none;">
          <div class="mini-clock" id="mini-clock" style="margin-left: 0;">
            <div class="mini-hand" id="m-h" style="height: 4px; width: 1px;"></div>
            <div class="mini-hand" id="m-m" style="height: 6px; width: 1px;"></div>
            <div class="mini-hand" id="m-s" style="height: 7px; width: 0.5px;"></div>
          </div>
        </a>
      </li>
      
      <!-- Hamburger Button -->
      <li class="hamburger-item">
        <button id="hamburger-btn">☰</button>
      </li>
    </ul>
  </nav>
`;

// Add toggle functionality for the hamburger menu
const hamburgerBtn = document.getElementById('hamburger-btn');
const navList = document.getElementById('nav-list');

if (hamburgerBtn && navList) {
  hamburgerBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
    
    // Toggle the icon between hamburger (☰) and close (✕)
    if (navList.classList.contains('active')) {
      hamburgerBtn.innerHTML = '✕';
    } else {
      hamburgerBtn.innerHTML = '☰';
    }
  });
}