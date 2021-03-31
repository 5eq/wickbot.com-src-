$(document).ready(async function(){$('#mainlogo').transition('set looping').transition('bounce','4000ms');let essentials;try{essentials=await(await fetch('/hessentials')).json()}catch{essentials=false;}
$(`#reviewsPercentage`).addClass((essentials.reviews.percentage>70?'green':essentials.reviews.percentage>50?'orange':'red')).removeClass('blue').text('').append(` ${essentials.reviews.percentage.toFixed(0)}% Positive `);const reviewMap=r=>`
  <div class="middle aligned column" style="min-width: 260px;">

  <div class="ui inverted card" style="margin: 0 auto;text-align: left !important;min-width: 250px;">
    <div class="content">
      <div class="header">
        ${r.title}
      </div>
      <div class="meta">
        <span class="right floated time">
          ${r.time}
        </span>
        <span class="category"><strong><span
              class="ui inverted default ${r.rating?'green':'red'} text">
              ${r.rating?'Positive Review <i class="icon thumbs up"></i>':'Negative Review <i class="icon thumbs down"></i>'}
            </span></strong></span>
      </div>
      <div class="description">
        <p>
          ${r.desc}
        </p>
      </div>
    </div>
    <div class="extra content">
      <div class="right floated author">
        <img class="ui avatar image" src="${r.avatar}">
        ${r.user}
      </div>
    </div>
  </div> 
</div>
  `
$(`#reviewsContainer`).text('').append(`
    <div class="ui centered stackable equal width grid container" style="margin: 15px;margin: 0 auto;">
    ${essentials.reviews.list.map(reviewMap).join(' ')}
    </div> 
    `);$(`#wickserversshowcase`).text('').append(essentials.trustedServers.map(tS=>`
    <div class="flex-col">
        <div class="cards" style="
background-color: #2e2e2e;
background-image: url('${tS.banner}');
background-size: cover;
background-repeat:   no-repeat;
background-position: center center;
">
                        <div class="readmore trustedServer">
                            <div style="margin: 10px">
                                <h2 class="ui left aligned header">
                                    <img alt="${tS.name}" class="ui avatar image trustedServerav" src="${tS.avatar}">
                                    <div class="content" style="padding-left: 2px !important;">
                                        <div class="sub header trustedServert">
                                            ${tS.name.substr(0,17)+(tS.name.length>17?'...':'')}
                                                ${tS.badges&&tS.badges.length?tS.badges.map(badge=>`
                                                <img alt="Discord Partnered Server" id="discordPartner"
                                                            src="${badge}"
                                                            data-content="Discord Partner"
                                                            data-variation="inverted"
                                                            style="max-width: 25px;max-height:15px;" />
                                                `):``}
                                        </div>
                                        <div class="sub header trustedServert">
                                            ${tS.memberCount} Members
                                        </div>
                                    </div>
                                </h2>
                            </div>
                        </div>

                </div>
        </div>
</div>
    `).join(' '))
$('#discordPartner').popup();$('#botlistsContainer').text('').append(`
    ${essentials.botlists.map((_,i)=>(i%3===0?essentials.botlists.slice(i,i+3):null)).filter(Boolean).map(blChunk=>`
        <div class="ui three column very relaxed stackable grid"
                      style="margin: 15px;margin: 0 auto;text-align: center;justify-content: center; justify-items: center;">
                      ${blChunk.map(botlist=>`
                      <div class="middle aligned column" style="
            margin: 0 auto;height: 150px; max-width:400px;min-width:300px;">
                          <a href="${botlist.url}">
                            <img class="lazy lozad" style="max-height: 100%; max-width: 100%" src="${botlist.img}"
                              alt="Wick on ${botlist.title}">
                          </a>
                        </div>
                      `).join('')}
        </div>
        `).join('')
}
    `)
$('#faqContainer').text('').append(`
                        <div class="ui inverted segment">
                          <div class="ui inverted fluid accordion" id="faqContainerA">
                          ${essentials.faq.map(qa=>`
                          <div class="title">
                                <i class="dropdown icon"></i>
                                ${qa.t}
                              </div>
                              <div class="content">
                                <p class="transition hidden">
                                  ${qa.a}
                                </p>
                              </div>
                          `).join(' ')}
                          </div>`)
$('#faqContainerA').accordion();});