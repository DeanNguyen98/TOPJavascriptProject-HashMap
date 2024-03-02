class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.buckets = new Array(initialCapacity);
        this.size = 0;
        this.loadFactor = loadFactor;
    }

    hash(key) {
        let hashCode = 0;
        const Primenumber = 31;
        for (let i=0; i< key.length; i++) {
            hashCode = (Primenumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
        }
        return hashCode;
    }

    grow() {
        const oldBuckets = this.buckets;
        this.buckets = new Array(oldBuckets.length * 2);
        this.size = 0;
        for (const bucket of oldBuckets) {
            if (bucket) {
                for (const entry of bucket) {
                    this.set(entry.key, entry.value)
                }
            }
        }
    }

    set(key, value) {
        if (this.size / this.length >= this.loadFactor) {
            this.grow();
        }
        const hashCode = this.hash(key);
        if (hashCode < 0 || hashCode >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
          }
        if (!this.buckets[hashCode]) {
            this.buckets.hashCode = [];
        }
        const bucket = this.buckets[hashCode];
        for (let i=0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket[i].value = value;
                return;
            }
        }
        bucket.push({key, value});
        this.size++;
    }
    get(key) {
        const hashCode = this.hash(key);
        if (hashCode < 0 || hashCode >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
        const bucket = this.buckets[hashCode];
        if (!bucket) {
            return null;
        }
        for (const entry of bucket) {
            if (entry.key === key) {
                return entry.value;
            }
        }
        return null;
    }
    has(key) {
        const hashCode = this.hash(key);
        if (hashCode < 0 || hashCode >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
        const bucket = this.buckets[hashCode];
        if (!bucket) return false;
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                return true;
            }
        }
        return false;
    }

}


