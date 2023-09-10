using System.Linq.Expressions;

namespace Exam.IRepository
{
    public interface IRepositoryBase<T>
    {
        IQueryable<T> FindAll();
        IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression);
        int Create(T entity);      
        int Delete(T entity);
        T GetById(int id);
    }
}
