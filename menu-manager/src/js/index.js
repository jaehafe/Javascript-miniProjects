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

const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem('menu', JSON.stringify(menu));
  },
  getLocalStorage() {
    localStorage.getItem('menu');
  },
};

function App() {
  // 상태(변경되는 값) - 개수, 메뉴명
  this.menu = [];

  // 총 메뉴 개수
  const updateMenuCount = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount}개`;
  };

  // 메뉴 이름 추가
  const addMenuName = () => {
    if ($('#espresso-menu-name').value === '') {
      alert('값을 입력해주세요');
      return;
    }
    const espressoMenuName = $('#espresso-menu-name').value;
    this.menu.push({ name: espressoMenuName });
    store.setLocalStorage(this.menu);
    const template = this.menu
      .map((menuItem, index) => {
        return `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
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

    // const menuItemTemplate = (espressoMenuName) => {
    //   return `<li class="menu-list-item d-flex items-center py-2">
    //       <span class="w-100 pl-2 menu-name">${item.name}</span>
    //       <button
    //         type="button"
    //         class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
    //       >
    //         수정
    //       </button>
    //       <button
    //         type="button"
    //         class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
    //       >
    //         삭제
    //       </button>
    //     </li>`;
    // };

    $('#espresso-menu-list').innerHTML = template;
    updateMenuCount();
    $('#espresso-menu-name').value = '';
  };

  // 메뉴 이름 업데이트 함수
  const updateMenuName = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = prompt(
      '메뉴명을 수정하세요',
      $menuName.textContent
    );
    this.menu[menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu);
    $menuName.textContent = updatedMenuName;
  };

  // 메뉴 이름 삭제 함수
  const removeMenuName = (e) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const menuId = e.target.closest('li').dataset.menuId;
      this.menu.splice(menuId, 1);
      e.target.closest('li').remove();
      updateMenuCount();
    }
  };

  // 수정 버튼 클릭, 삭제
  $('#espresso-menu-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName(e);
    }

    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuName(e);
    }
  });

  // form 태그 전송 prevent
  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  // 메뉴 추가 버튼
  $('#espresso-menu-submit-button').addEventListener('click', addMenuName);

  // 메뉴의 이름 입력 받음
  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    addMenuName();
  });
}

const app = new App();
