const { getToken, getTweets } = require('../twitter')
const got = require('got')
const mockdate = require('mockdate')

jest.mock('got')
jest.mock('randomcolor', () => jest.fn().mockReturnValue('#0088ff'))
jest.mock('form-data', () =>
  jest.fn(() => ({
    append: jest.fn(),
  }))
)

describe('#getToken', () => {
  test('should get a token', async () => {
    got.post.mockResolvedValueOnce({
      body: '{"access_token":"token"}',
    })

    await getToken()

    expect(got.post.mock.calls[0]).toMatchSnapshot()
  })

  test('should return token', async () => {
    got.post.mockResolvedValueOnce({
      body: '{"access_token":"token"}',
    })

    await expect(getToken()).resolves.toMatchSnapshot()
  })
})

describe('#getTweets', () => {
  test('should get a token and get tweets', async () => {
    mockdate.set('2019-04-01')

    got.post
      .mockResolvedValueOnce({
        body: '{"access_token":"token"}',
      })
      .mockResolvedValueOnce({
        body: {
          results: [],
        },
      })

    await getTweets('testtag')

    // Only validate second call because previous test asserts on first call for token
    expect(got.post.mock.calls[1]).toMatchSnapshot()
  })

  test('should return a list of the 100 most used words', async () => {
    mockdate.set('2019-04-01')

    got.post
      .mockResolvedValueOnce({
        body: '{"access_token":"token"}',
      })
      .mockResolvedValueOnce({
        body: {
          results: [
            {
              text:
                '"Amet" ökar cum vel #nobis iste nemo: Aut voluptas ut saepe tempora similique. Illo facilis at tempora fuga nostrum? Animi molestiae consectetur aliquam at explicabo Reprehenderit architecto & &amp; consequatur enim commodi & deleniti',
            },
            {
              text:
                'Conse😅ctetur iste åter alias\n\n dolores atque tenetur Numquam ipsa tempore ad dolore aspernatur Unde laudantium possimus temporibus iste illum libero laborum! Quas nemo exercitationem quibusdam amet ipsam perspiciatis Molestiae unde & laborum. äta',
            },
            {
              text:
                'Elit… sit ullam https//tco/siqurycll7 optio åter sit perspiciatis. Et quos esse nihil officia enim Consequatur pariatur quo commodi adipisci voluptates dicta In aut non molestiae corporis consequuntur! Alias ex nihil rem &amp; at',
            },
            {
              text:
                'Am😁et! eaque... ¿amet https//tco/siqurycll7 reprehenderit, labore a! Explicabo fugiat odit mollitia saepe labore tempore, doloremque. Consectetur quod rem quidem consectetur eaque. Perspiciatis est @amet eligendi ut labore sapiente excepturi. äta Perferendis &amp; ökar natus!',
            },
          ],
        },
      })

    const result = await getTweets('testtag')

    expect(result).toMatchSnapshot()
    expect(result.length).toBeLessThanOrEqual(100)
  })
})
