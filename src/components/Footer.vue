<script setup></script>

<template>
  <!-- Footer -->
  <footer class="bg-gray-800 text-white pt-4">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Footer Items -->
        <div class="mb-3">
          <img
            src="@/assets/images/logo.jpg"
            class="img-fluid rounded h-12"
            alt="AI AA NGO"
          />
          <p class="mt-2">
            Follow Us on Social Media.<br />
            Stay connected with ERP and be the first to know about our latest
            news and initiatives.
          </p>
        </div>

        <div class="mb-3">
          <h2 class="text-lg font-bold">Quick Links</h2>
          <hr class="bg-yellow-500 w-1/4 my-2" />
          <ul class="list-none space-y-1">
            <li>
              <a href="/" class="text-white hover:text-yellow-400">Home</a>
            </li>
            <li>
              <a href="/about" class="text-white hover:text-yellow-400"
                >About Us</a
              >
            </li>
            <li>
              <a href="/impact" class="text-white hover:text-yellow-400"
                >Our Impact</a
              >
            </li>
            <li>
              <a href="/blog" class="text-white hover:text-yellow-400"
                >Educational Resources</a
              >
            </li>
            <li>
              <a href="/get-involved" class="text-white hover:text-yellow-400"
                >Get Involved</a
              >
            </li>
            <li>
              <a href="/contact" class="text-white hover:text-yellow-400"
                >Contact</a
              >
            </li>
          </ul>
        </div>

        <div class="mb-3">
          <h2 class="text-lg font-bold">Connect with Us</h2>
          <hr class="bg-yellow-500 w-1/4 my-2" />
          <ul class="list-none space-y-1">
            <li>
              <i class="bi bi-geo-alt me-2"></i>P.O. Box 12345-00100, Nairobi,
              Kenya
            </li>
            <li><i class="bi bi-telephone me-2"></i>+254-700-000-000</li>
            <li>
              <i class="bi bi-envelope me-2"></i>
              <a
                href="mailto:info@aiaango.org"
                class="text-white hover:text-yellow-400"
                >info@aiaa-kenya.org</a
              >
            </li>
          </ul>
          <div class="mt-3 flex space-x-4">
            <a href="#" class="text-white hover:text-yellow-400"
              ><i class="bi bi-facebook"></i
            ></a>
            <a href="#" class="text-white hover:text-yellow-400"
              ><i class="bi bi-twitter"></i
            ></a>
            <a href="#" class="text-white hover:text-yellow-400"
              ><i class="bi bi-instagram"></i
            ></a>
            <a href="#" class="text-white hover:text-yellow-400"
              ><i class="bi bi-linkedin"></i
            ></a>
          </div>
        </div>

        <div class="mb-3">
          <h2 class="text-lg font-bold">Important Links</h2>
          <hr class="bg-yellow-500 w-1/4 my-2" />
          <ul class="list-none space-y-1">
            <li>
              <a href="/privacy-policy" class="text-white hover:text-yellow-400"
                >Privacy Policy</a
              >
            </li>
            <li>
              <a
                href="/terms-of-service"
                class="text-white hover:text-yellow-400"
                >Terms of Service</a
              >
            </li>
            <li>
              <a href="/faq" class="text-white hover:text-yellow-400">FAQ</a>
            </li>
            <li>
              <a href="/support" class="text-white hover:text-yellow-400"
                >Support</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bg-gray-700 text-center py-2">
      <small>&copy; 2024 AI AA NGO. All rights reserved.</small>
    </div>
  </footer>
</template>

<style scoped>
hr {
  height: 2px;
  border: none;
}
</style>
