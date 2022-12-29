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
// - [] 총 메뉴 객수를 count해 상단에 보여준다.

const $ = (selector) => document.querySelector(selector);

function App() {
  // 총 메뉴 개수
  const updateMenuCount = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount}개`;
  };

  $('#espresso-menu-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      const $menuName = e.target.closest('li').querySelector('.menu-name');
      const updatedMenuName = prompt(
        '메뉴명을 수정하세요',
        $menuName.textContent
      );
      $menuName.textContent = updatedMenuName;
    }

    if (e.target.classList.contains('menu-remove-button')) {
      if (confirm('정말 삭제하시겠습니까?')) {
        e.target.closest('li').remove();
        updateMenuCount();
      }
    }
  });

  // form 태그 전송 prevent
  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  const addMenuName = () => {
    if ($('#espresso-menu-name').value === '') {
      alert('값을 입력해주세요');
      return;
    }
    const espressoMenuName = $('#espresso-menu-name').value;
    const menuItemTemplate = (espressoMenuName) => {
      return `<li class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
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
    };

    $('#espresso-menu-list').insertAdjacentHTML(
      'beforeend',
      menuItemTemplate(espressoMenuName)
    );
    //
    updateMenuCount();
    $('#espresso-menu-name').value = '';
  };

  $('#espresso-menu-submit-button').addEventListener('click', () => {
    addMenuName();
  });

  // 메뉴의 이름 입력 받음
  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    addMenuName();
  });
}

App();
