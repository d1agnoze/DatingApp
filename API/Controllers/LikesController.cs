using API.Interaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Extensions;
using API.Entities;
using API.DTOs;
using API.Helpers;

namespace API.Controllers
{   [Authorize]
    public class LikesController : BaseApiController
    {
        private readonly ILikesRepository _likesRepository;
        private readonly IUserRepository _userRepository;
        public LikesController(IUserRepository userRepository, ILikesRepository likesRepository)
        {
            _userRepository = userRepository;
            _likesRepository = likesRepository;
        }
        [HttpPost("{username}")]
        public async Task<ActionResult> AddLike(string username){
            var sourceUserId = User.GetUserId();
            var likedUser = await _userRepository.GetUserByUsernameAsync(username);
            var SourceUser = await _likesRepository.GetUserWithLikes(sourceUserId);
            if (likedUser == null)
            {   return NotFound();
            }
            if(SourceUser.UserName == username) return BadRequest("U cant like yourself");
            var userLike = await _likesRepository.GetUserLike(sourceUserId, likedUser.Id);
            if (userLike != null) return BadRequest("You Already Liked this Person");
            userLike = new UserLike
            {
                SourceUserId = sourceUserId,
                LikeUserId = likedUser.Id,
            };
            SourceUser.LikeUsers.Add(userLike);
            if (await _userRepository.SaveAllAsync())
            {
                return Ok("Liked");
            }
            return BadRequest("Failed to Like User");
        }
        [HttpGet]
        public async Task<ActionResult<PagedList<LIkeDto>>> GetUserLikes ([FromQuery]LikesParams likesParams){
            likesParams.UserId = User.GetUserId();
            var user =  await _likesRepository.GetUserLikes(likesParams);
            Response.AddPaginationHeader(user.CurrentPage,user.PageSize, user.TotalCount, user.TotalPages);
            return Ok(user);
        }
    }
}