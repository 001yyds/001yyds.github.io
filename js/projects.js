/* 项目内容已由 Hexo 生成；这段脚本只增强筛选和搜索。 */
;(function () {
  'use strict'

  function initProjects () {
    const page = document.querySelector('.projects-page')
    if (!page || page.dataset.ready) return
    page.dataset.ready = 'true'

    const toolbar = page.querySelector('.projects-toolbar')
    const input = page.querySelector('input[type="search"]')
    const filters = Array.from(page.querySelectorAll('.projects-filter'))
    const sections = Array.from(page.querySelectorAll('.projects-section'))
    const cards = Array.from(page.querySelectorAll('.project-card')).map(element => ({
      element,
      group: element.closest('.projects-section').dataset.group,
      text: element.textContent.normalize('NFKC').toLocaleLowerCase()
    }))
    const empty = page.querySelector('.projects-empty')
    const results = page.querySelector('.projects-results')
    let active = 'all'

    // 没有项目时保留静态空状态；禁用 JS 也能直接阅读全部项目。
    if (!cards.length) return
    toolbar.hidden = false

    function update () {
      const words = input.value.normalize('NFKC').trim().toLocaleLowerCase().split(/\s+/).filter(Boolean)
      let visible = 0
      for (const card of cards) {
        const matches = (active === 'all' || card.group === active) && words.every(word => card.text.includes(word))
        card.element.hidden = !matches
        if (matches) visible++
      }
      for (const section of sections) {
        const count = cards.filter(card => card.group === section.dataset.group && !card.element.hidden).length
        section.hidden = count === 0
        section.querySelector('.projects-section-count').textContent = count
      }
      for (const button of filters) {
        button.setAttribute('aria-pressed', String(button.dataset.filter === active))
      }
      empty.hidden = visible !== 0
      results.hidden = false
      results.textContent = words.length ? `找到 ${visible} 个项目` : `共 ${visible} 个项目，随手逛逛。`
    }

    for (const button of filters) {
      button.addEventListener('click', function () {
        active = button.dataset.filter
        update()
      })
    }
    input.addEventListener('input', update)
    const reset = page.querySelector('.projects-reset')
    if (reset) reset.addEventListener('click', function () {
      active = 'all'
      input.value = ''
      update()
      input.focus({ preventScroll: true })
    })
    update()
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initProjects, { once: true })
  else initProjects()
  document.addEventListener('pjax:complete', initProjects)
})()
