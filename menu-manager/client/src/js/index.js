// step1
//TODO 메뉴 추가
// 에스프레소 메뉴에 새로운 메뉴를 확인 버튼 또는 엔터키 입력으로 추가한다.
// 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// 사용자 입력값이 빈 값이라면 추가되지 않는다.
// 메뉴의 수정 버튼을 눌러 메뉴 이름 수정할 수 있다.
// 메뉴 수정시 브라우저에서 제공하는 prompt 인터페이스를 활용한다.
// 메뉴 삭제 버튼을 이용하여 메뉴 삭제할 수 있다.
// 메뉴 삭제시 브라우저에서 제공하는 confirm 인터페이스를 활용한다.
// 총 메뉴 갯수를 count하여 상단에 보여준다.
// TODO 메뉴 수정
// - [x] 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 수정하는 모달창(prompt)이 뜬다.
// - [x] 모달창에서 신규메뉴명을 입력 받고, 확인 버튼을 누르면 메뉴가 수정된다.
// TODO 메뉴 삭제
// - [x] 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌 모달창이 뜬다.
// - [x] 확인 버튼을 클릭하면 메뉴가 삭제된다.
// - [x] 총 메뉴 객수를 count해 상단에 보여준다.

// step2
// TODO localStorage get, set
// -[] localStorage에 데이터를 저장하고 읽어온다
//  -[x] 메뉴를 추가할 때
//  -[] 메뉴를 수정할 때
//  -[] 메뉴를 삭제할 때
// 각각의 메뉴를 종류별로 관리한다.
// 페이지 최초 접근 시 에스프레스 메뉴가 먼저 보이게 한다. -

// 품절 상태의 버튼 추가하고 sold-out class를 추가해 상태 변경

// step3
// -[x] 웹 서버를 띄운다.
// -[x] 서버에 새로운 메뉴명을 추가할 수 있도록 요청한다
// -[x] 서버에 카테고리별 메뉴리스트를 불러온다.
// -[] 서버에 메뉴를 수정할 수 있도록 요청한다.
// -[] 서버에 메뉴의 품절상태를 토글할 수 있도록 요청한다.
// -[] 서버에 메뉴를 삭제하도록 요청한다.

// 리팩터링 부분
// -[] localStorage 관련 로직은 삭제한다.
// -[] fetch 비동기 api를 사용하는 부분을 async await을 사용하여 구현한다.
// -[] api 통신이 실패하는 경우는 사용자에게 alert 에외처리 진행.
// -[] 중복된 메뉴는 추가할 수 없다.

import { $ } from './utils/dom.js';
import store from './store/index.js';

const BASE_URL = 'http://localhost:3000/api';

const MenuApi = {
  async getAllMenuByCategory(category) {
    // 전체 메뉴를 서버에서 불러오기
    const response = await fetch(`${BASE_URL}/category/${category}/menu`);
    return response.json();
  },

  async createMenu(category, name) {
    const response = await fetch(`${BASE_URL}/category/${category}/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    });
    if (!response.ok) {
      console.error('에러가 발생했습니다.');
    }
  },

  async updateMenu(category, name, menuId) {
    const response = await fetch(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      }
    );
    if (!response.ok) {
      console.error('에러가 발생했습니다.');
    }
    return response.json();
  },

  async toggleSoldOutMenu(category, menuId) {
    const response = await fetch(
      `${BASE_URL}/category/${category}/menu/${menuId}/soldout`,
      {
        method: 'PUT',
      }
    );
    if (!response.ok) {
      console.error('에러가 발생했습니다.');
    }
  },

  async deleteMenu(category, menuId) {
    const response = await fetch(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      console.error('에러가 발생했습니다.');
    }
  },
};

function App() {
  // 상태(변경되는 값) - 개수, 메뉴명
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.currentCategory = 'espresso';

  // 현재 카테고리를 처음 화면에 렌더링
  this.init = async () => {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    );
    console.log(MenuApi.getAllMenuByCategory(this.currentCategory));
    render();
    initEventListeners();
  };

  // (화면에 그려주는) 렌더 함수
  const render = () => {
    const template = this.menu[this.currentCategory]
      .map((menuItem) => {
        return `
        <li data-menu-id="${
          menuItem.id
        }" class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name ${
            menuItem.isSoldOut ? 'sold-out' : ''
          }">${menuItem.name}</span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
          >
            품절
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
            수정
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          >
            삭제
          </button>
        </li>`;
      })
      .join('');

    $('#menu-list').innerHTML = template;
    updateMenuCount();
  };

  // 총 메뉴 개수 업데이트 함수
  const updateMenuCount = () => {
    const menuCount = $('#menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${
      this.menu[this.currentCategory].length
    }개`;
  };

  // 메뉴 이름 추가
  const addMenuName = async () => {
    if ($('#menu-name').value === '') {
      alert('값을 입력해주세요');
      return;
    }
    const menuName = $('#menu-name').value;

    // fetch 메뉴 추가
    await MenuApi.createMenu(this.currentCategory, menuName);

    // 전체 메뉴를 서버에서 불러오기
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    );
    render();
    $('#menu-name').value = '';
  };

  // 메뉴 이름 업데이트 함수
  const updateMenuName = async (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = prompt(
      '메뉴명을 수정하세요',
      $menuName.textContent
    );
    await MenuApi.updateMenu(this.currentCategory, updatedMenuName, menuId);

    // 수정한 후 전체 메뉴를 서버에서 다시 불러오기
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    );
    render();
  };

  // 메뉴 이름 삭제 함수
  const removeMenuName = async (e) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const menuId = e.target.closest('li').dataset.menuId;
      await MenuApi.deleteMenu(this.currentCategory, menuId);
      this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
        this.currentCategory
      );
      render();
    }
  };

  // 메뉴 이름 품절 처리 함수
  const soldOutMenu = async (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    await MenuApi.toggleSoldOutMenu(this.currentCategory, menuId);
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    );

    render();
  };

  const initEventListeners = () => {
    // 수정 버튼 클릭, 삭제, 품절
    $('#menu-list').addEventListener('click', (e) => {
      if (e.target.classList.contains('menu-edit-button')) {
        updateMenuName(e);
        return;
      }

      if (e.target.classList.contains('menu-remove-button')) {
        removeMenuName(e);
        return;
      }
      if (e.target.classList.contains('menu-sold-out-button')) {
        soldOutMenu(e);
        return;
      }
    });

    // form 태그 전송 prevent
    $('#menu-form').addEventListener('submit', (e) => {
      e.preventDefault();
    });

    // 메뉴 추가 버튼
    $('#menu-submit-button').addEventListener('click', addMenuName);

    // 메뉴의 이름 입력 받음
    $('#menu-name').addEventListener('keypress', (e) => {
      if (e.key !== 'Enter') {
        return;
      }
      addMenuName();
    });

    // 각 카테고리 클릭 시, 클릭한 카테고리로 렌더링
    $('nav').addEventListener('click', async (e) => {
      const isCategoryButton =
        e.target.classList.contains('cafe-category-name');
      if (isCategoryButton) {
        const categoryName = e.target.dataset.categoryName;
        this.currentCategory = categoryName;
        $('#category-title').textContent = `${e.target.textContent} 메뉴 관리`;
        this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
          this.currentCategory
        );
        render();
      }
    });
  };
}

const app = new App();
app.init();
