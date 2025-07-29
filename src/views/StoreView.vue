<template>
    <MainLayout>
        <div class="store-view">
            <div class="store-view-header">
                <div class="store-view-header-title">
                    <h1 class="store-view-header-title">OOO님,</h1>
                    <span>어서오세요</span>
                </div>
                <div class="store-view-header-point">
                    <h1>10000</h1>
                    <img src="@/assets/money.svg" alt="m oney" />
                </div>
            </div>
        </div>
    <hr style="border: none; border-top: 1px solid #a0a0a0; margin: 18px 0;" />
    <div class="store-view-content">
        <div class="store-view-content-search">
            <SearchView :filters="['난이도', '데이터']" :first_options="['쉬움', '보통', '어려움']" :second_options="['영상', '문제']" :isRange="false" />
        </div>

        <div class="store-view-content-header">
            <ProductCard v-for="product in productList" :product="product" />
        </div>
    </div>
    </MainLayout>
</template>
<script setup lang="ts">
    import MainLayout from '@/layouts/MainLayout.vue'
    import SearchView from '@/common/components/shared/SearchView.vue'
    import ProductCard from '@/common/components/shared/ProductCard.vue'
    import { ref } from 'vue'

    import type { Product } from '@/services/info'

    
    const productList = ref<Product[]>([
        {
            id: 1,
            title: '치킨 상품권',
            category: '음식',
            price: 10000,
            thumbnail: 'https://picsum.photos/200/300?random=1',
            Field1: '치킨 상품권',
            Field2: '음식'
        },
        {
            id: 2,
            title: '피자 상품권',
            category: '음식',
            price: 12000,
            thumbnail: 'https://picsum.photos/200/300?random=2',
            Field1: '피자 상품권',
            Field2: '음식'
        },
        {
            id: 3,
            title: '카페 아메리카노',
            category: '음료',
            price: 4000,
            thumbnail: 'https://picsum.photos/200/300?random=3',
            Field1: '카페 아메리카노',
            Field2: '음료'
        },
        {
            id: 4,
            title: '편의점 상품권',
            category: '기타',
            price: 5000,
            thumbnail: 'https://picsum.photos/200/300?random=4',
            Field1: '편의점 상품권',
            Field2: '기타'
        },
        {
            id: 5,
            title: '영화 관람권',
            category: '문화',
            price: 9000,
            thumbnail: 'https://picsum.photos/200/300?random=5',
            Field1: '영화 관람권',
            Field2: '문화'
        },
        {
            id: 6,
            title: '치즈케이크',
            category: '디저트',
            price: 6500,
            thumbnail: 'https://picsum.photos/200/300?random=6',
            Field1: '치즈케이크',
            Field2: '디저트'
        },
        {
            id: 7,
            title: '햄버거 세트',
            category: '음식',
            price: 8000,
            thumbnail: 'https://picsum.photos/200/300?random=7',
            Field1: '햄버거 세트',
            Field2: '음식'
        },
        {
            id: 8,
            title: '아이스크림',
            category: '디저트',
            price: 3000,
            thumbnail: 'https://picsum.photos/200/300?random=8',
            Field1: '아이스크림',
            Field2: '디저트'
        },
        {
            id: 9,
            title: '도넛 세트',
            category: '디저트',
            price: 5500,
            thumbnail: 'https://picsum.photos/200/300?random=9',
            Field1: '도넛 세트',
            Field2: '디저트'
        },
        {
            id: 10,
            title: '초콜릿',
            category: '디저트',
            price: 2500,
            thumbnail: 'https://picsum.photos/200/300?random=10',
            Field1: '초콜릿',
            Field2: '디저트'
        },
        {
            id: 11,
            title: '떡볶이',
            category: '음식',
            price: 6000,
            thumbnail: 'https://picsum.photos/200/300?random=11',
            Field1: '떡볶이',
            Field2: '음식'
        },
        {
            id: 12,
            title: '샌드위치',
            category: '음식',
            price: 5500,
            thumbnail: 'https://picsum.photos/200/300?random=12',
            Field1: '샌드위치',
            Field2: '음식'
        },
        {
            id: 13,
            title: '스무디',
            category: '음료',
            price: 5000,
            thumbnail: 'https://picsum.photos/200/300?random=13',
            Field1: '스무디',
            Field2: '음료'
        },
        {
            id: 14,
            title: '콜라',
            category: '음료',
            price: 2000,
            thumbnail: 'https://picsum.photos/200/300?random=14',
            Field1: '콜라',
            Field2: '음료'
        },
        {
            id: 15,
            title: '사이다',
            category: '음료',
            price: 2000,
            thumbnail: 'https://picsum.photos/200/300?random=15',
            Field1: '사이다',
            Field2: '음료'
        },
        {
            id: 16,
            title: '과자 세트',
            category: '기타',
            price: 3500,
            thumbnail: 'https://picsum.photos/200/300?random=16',
            Field1: '과자 세트',
            Field2: '기타'
        },
        {
            id: 17,
            title: '편의점 도시락',
            category: '음식',
            price: 5000,
            thumbnail: 'https://picsum.photos/200/300?random=17',
            Field1: '편의점 도시락',
            Field2: '음식'
        },
        {
            id: 18,
            title: '치킨버거',
            category: '음식',
            price: 7000,
            thumbnail: 'https://picsum.photos/200/300?random=18',
            Field1: '치킨버거',
            Field2: '음식'
        },
        {
            id: 19,
            title: '핫도그',
            category: '음식',
            price: 3500,
            thumbnail: 'https://picsum.photos/200/300?random=19',
            Field1: '핫도그',
            Field2: '음식'
        },
        {
            id: 20,
            title: '마카롱',
            category: '디저트',
            price: 4000,
            thumbnail: 'https://picsum.photos/200/300?random=20',
            Field1: '마카롱',
            Field2: '디저트'
        },
        {
            id: 21,
            title: '딸기라떼',
            category: '음료',
            price: 4500,
            thumbnail: 'https://picsum.photos/200/300?random=21',
            Field1: '딸기라떼',
            Field2: '음료'
        },
        {
            id: 22,
            title: '카페라떼',
            category: '음료',
            price: 4500,
            thumbnail: 'https://picsum.photos/200/300?random=22',
            Field1: '카페라떼',
            Field2: '음료'
        },
        {
            id: 23,
            title: '치즈볼',
            category: '디저트',
            price: 3500,
            thumbnail: 'https://picsum.photos/200/300?random=23',
            Field1: '치즈볼',
            Field2: '디저트'
        },
        {
            id: 24,
            title: '감자튀김',
            category: '음식',
            price: 3000,
            thumbnail: 'https://picsum.photos/200/300?random=24',
            Field1: '감자튀김',
            Field2: '음식'
        },
        {
            id: 25,
            title: '초코우유',
            category: '음료',
            price: 2000,
            thumbnail: 'https://picsum.photos/200/300?random=25',
            Field1: '초코우유',
            Field2: '음료'
        },
        {
            id: 26,
            title: '딸기우유',
            category: '음료',
            price: 2000,
            thumbnail: 'https://picsum.photos/200/300?random=26',
            Field1: '딸기우유',
            Field2: '음료'
        },
        {
            id: 27,
            title: '바나나우유',
            category: '음료',
            price: 2000,
            thumbnail: 'https://picsum.photos/200/300?random=27',
            Field1: '바나나우유',
            Field2: '음료'
        },
        {
            id: 28,
            title: '치킨텐더',
            category: '음식',
            price: 6000,
            thumbnail: 'https://picsum.photos/200/300?random=28',
            Field1: '치킨텐더',
            Field2: '음식'
        },
        {
            id: 29,
            title: '에그타르트',
            category: '디저트',
            price: 3500,
            thumbnail: 'https://picsum.photos/200/300?random=29',
            Field1: '에그타르트',
            Field2: '디저트'
        },
        {
            id: 30,
            title: '쿠키세트',
            category: '디저트',
            price: 4000,
            thumbnail: 'https://picsum.photos/200/300?random=30',
            Field1: '쿠키세트',
            Field2: '디저트'
        },
        {
            id: 31,
            title: '아이스티',
            category: '음료',
            price: 3000,
            thumbnail: 'https://picsum.photos/200/300?random=31',
            Field1: '아이스티',
            Field2: '음료'
        },
        {
            id: 32,
            title: '핫초코',
            category: '음료',
            price: 3500,
            thumbnail: 'https://picsum.photos/200/300?random=32',
            Field1: '핫초코',
            Field2: '음료'
        },
        {
            id: 33,
            title: '치즈피자',
            category: '음식',
            price: 11000,
            thumbnail: 'https://picsum.photos/200/300?random=33',
            Field1: '치즈피자',
            Field2: '음식'
        },
        {
            id: 34,
            title: '불고기버거',
            category: '음식',
            price: 7500,
            thumbnail: 'https://picsum.photos/200/300?random=34',
            Field1: '불고기버거',
            Field2: '음식'
        },
        {
            id: 35,
            title: '콘치즈',
            category: '음식',
            price: 5000,
            thumbnail: 'https://picsum.photos/200/300?random=35',
            Field1: '콘치즈',
            Field2: '음식'
        },
        {
            id: 36,
            title: '팝콘',
            category: '디저트',
            price: 3000,
            thumbnail: 'https://picsum.photos/200/300?random=36',
            Field1: '팝콘',
            Field2: '디저트'
        },
        {
            id: 37,
            title: '아메리카노',
            category: '음료',
            price: 3500,
            thumbnail: 'https://picsum.photos/200/300?random=37',
            Field1: '아메리카노',
            Field2: '음료'
        },
        {
            id: 38,
            title: '카푸치노',
            category: '음료',
            price: 4000,
            thumbnail: 'https://picsum.photos/200/300?random=38',
            Field1: '카푸치노',
            Field2: '음료'
        },
        {
            id: 39,
            title: '치킨너겟',
            category: '음식',
            price: 5000,
            thumbnail: 'https://picsum.photos/200/300?random=39',
            Field1: '치킨너겟',
            Field2: '음식'
        },
        {
            id: 40,
            title: '딸기케이크',
            category: '디저트',
            price: 7000,
            thumbnail: 'https://picsum.photos/200/300?random=40',
            Field1: '딸기케이크',
            Field2: '디저트'
        }
    ])
</script>
<style scoped>
.store-view-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.store-view-header-title {
    /* font-size: 24px; */
    display: flex;
    flex-direction: row;
    align-items: baseline;
    font-weight: bold;
}
.store-view-header-point {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}
.store-view-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.store-view-content-header {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* gap: 40px; */
    row-gap: 40px;
    column-gap: 42px;
    width: 100%;
}
.store-view-content-search {
    margin-bottom: 66px;
}
</style>