# Test Scenarios Checklist

Page: http://localhost:3000/store

## Positive

- [ ] Search - valid query: enter a term in `store-search-input`, click `store-search-btn`, expect `product-list` filtered and `results-count` > 0.
- [ ] Filter - single category: click `filter-laptops` (or another category), expect only matching `product-card-*` items and `results-count` update.
- [ ] Sort - price ascending/descending: change `store-sort-select`, expect `product-price-*` order to update accordingly.
- [ ] Pagination navigation: use `pagination-next`/`pagination-prev` and page numbers, expect `current-page`/`visible-count` update and new items shown.
- [ ] Add to cart - single item: click `add-to-cart-1`, expect `store-nav-cart` count increments and success shown in `store-toast-container`.
- [ ] Wishlist add/remove: toggle `wishlist-btn-1`, expect `store-nav-wishlist` count and `dd-wishlist` reflect the change.
- [ ] Product details navigation: click `product-name-1` or `product-img-1`, expect navigation to product detail with correct `product-name`/`product-price`.
- [ ] Profile actions: open `store-nav-profile-btn` → `store-profile-dropdown`, click `dd-orders`/`dd-logout` and verify correct pages/actions.
- [ ] Hero CTA: click `hero-shop-now`, expect navigation/scroll to product area or category.
- [ ] Discount display: for items with `product-discount-*`, verify `product-orig-price-*` and `product-price-*` show correct discounted values.

## Negative

- [ ] Search - no results: search an unknown string, expect `results-count` 0 and a user-friendly "no results" message, no JS errors.
- [ ] Empty search submit: submit with empty `store-search-input`, expect defined behavior (show all results or validation message).
- [ ] Add to cart - out of stock: attempt to add an out-of-stock item, expect disabled `add-to-cart` or an error toast and no cart increment.
- [ ] Rapid duplicate add-to-cart: rapidly click `add-to-cart-1`, expect debounce/throttle so only one add occurs.
- [ ] Wishlist while logged out: if logged out, clicking `wishlist-btn-*` should redirect to login or show auth prompt.
- [ ] Broken product link/image: click product links/images that 404, expect placeholder and graceful handling (no crash).
- [ ] Invalid pagination number: manually set page to a very large number, expect graceful fallback (empty results or last page).
- [ ] Malformed filter/sort params: tamper with query params to invalid values, expect no JS exceptions and safe fallback.

## Edge Cases

- [ ] Very long product names: verify UI truncation/ellipsis/tooltips for extremely long `product-name-*`.
- [ ] Large result sets: load many results, check pagination, performance, and `visible-count` accuracy.
- [ ] Zero-priced / free items: ensure price displays correctly (e.g., "Free") and checkout flow handles zero total.
- [ ] Extreme price values / precision: very large or highly fractional prices render and calculate correctly.
- [ ] Simultaneous filter+sort+pagination: apply filters, change sort, navigate pages, then refresh — state should persist or be predictable.
- [ ] Network interruptions: during `add-to-cart` or search, simulate slow/lost network and verify retries, error messages, and no inconsistent state.
- [ ] Rapid UI actions: rapidly toggle filters, sort, and clicks; app should remain stable without duplicates or crashes.
- [ ] Missing product metadata: products with missing image/price/name show placeholders and cannot be purchased incorrectly.
- [ ] Accessibility checks: keyboard focus order to `store-search-input`, `store-search-btn`, `add-to-cart-*`; ARIA labels for `store-nav-cart`/`store-nav-wishlist`.
- [ ] Localization / currency formatting: change locale/currency and verify `product-price-*` formatting and sorting behave correctly.
- [ ] Concurrent sessions/cart sync: add/remove items in another session; verify cart view updates or documents eventual consistency.
- [ ] Edge pagination: first/last page behavior, `pagination-prev` disabled on first page and `pagination-next` on last.

---

Generated from page testids captured by session `autosession`.
