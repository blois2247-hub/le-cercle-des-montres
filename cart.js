/* ── Le Cercle des Montres · Panier ───────────────────────────── */
const Cart = {
    key: 'lcm_cart',

    get() {
        return JSON.parse(localStorage.getItem(this.key) || '[]');
    },

    add(item) {
        const cart = this.get();
        if (cart.find(i => i.id === item.id)) return { added: false, cart };
        cart.push(item);
        localStorage.setItem(this.key, JSON.stringify(cart));
        this.updateBadge();
        return { added: true, cart };
    },

    remove(id) {
        const cart = this.get().filter(i => i.id !== id);
        localStorage.setItem(this.key, JSON.stringify(cart));
        this.updateBadge();
        return cart;
    },

    count() { return this.get().length; },

    total() { return this.get().reduce((sum, i) => sum + i.price, 0); },

    clear() {
        localStorage.removeItem(this.key);
        this.updateBadge();
    },

    updateBadge() {
        document.querySelectorAll('.cart-badge').forEach(badge => {
            const count = this.count();
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });
    },

    formatPrice(n) {
        return n.toLocaleString('fr-FR') + ' €';
    }
};

/* Init badge on every page */
document.addEventListener('DOMContentLoaded', () => Cart.updateBadge());
