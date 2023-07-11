using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LikesRepository : ILikesRepository
    {
        private readonly DataContext _context;
        public LikesRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<UserLike> GetUserLike(int sourceUserId, int likedUserId)
        {
            return await _context.Likes.FindAsync(sourceUserId, likedUserId);
        }

        public async Task<PagedList<LIkeDto>> GetUserLikes(LikesParams likesParams)
        {
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var likes = _context.Likes.AsQueryable();
            //users from we liked
            if (likesParams.Predicate == "liked")
            {
                likes = likes.Where(like => like.SourceUserId == likesParams.UserId);
                users = likes.Select(like => like.LikeUser);
            }
            //list of the users that like the current user
            if (likesParams.Predicate == "likedBy")
            {
                likes = likes.Where(like => like.LikeUserId == likesParams.UserId);
                users = likes.Select(like => like.SourceUser);

            }

            var likedUsers =  users.Select(u => new LIkeDto
            {
                Username = u.UserName,
                Age = u.DateOfBirth.CalculateAge(),
                KnownAs = u.KnownAs,
                PhotoUrl = u.Photos.FirstOrDefault(x => x.IsMain).Url,
                City = u.City,
                Id = u.Id,
            });

            return await PagedList<LIkeDto>.CreateAsync(likedUsers, likesParams.PageNumber, likesParams.PageSize); 
        }

        public async Task<AppUser> GetUserWithLikes(int userId)
        {
            return await _context.Users.Include(x => x.LikeUsers).FirstOrDefaultAsync(x => x.Id == userId);
        }
    }
}